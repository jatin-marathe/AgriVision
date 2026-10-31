"""Rule-based disease risk index (NOT a trained ML model).

No labelled weather-to-outbreak dataset is bundled, so risk is computed from
documented plant-pathology rules: for each major disease of a crop we score how
favourable the current temperature, humidity and recent rainfall are for
infection, then discount for a recent protective spray and an off-season
disease. All thresholds below are approximate general guidance. Review them
with an agronomist before relying on the output.
"""

SEASONS = ("summer", "monsoon", "post_monsoon", "winter")
PESTICIDE_BUCKETS = ("0_7", "8_14", "15_30", "30_plus")

# Multiplier applied to the score after a recent protective spray.
PESTICIDE_PROTECTION = {"0_7": 0.65, "8_14": 0.85, "15_30": 0.95, "30_plus": 1.0}
OFF_SEASON_FACTOR = 0.75   # disease is less typical in the selected season
TEMP_TOLERANCE_C = 5       # degrees outside the preferred range where favourability hits 0
HUMIDITY_RAMP = 20         # % points below the threshold where favourability hits 0
RAIN_FULL_MM = 100         # recent rainfall at which leaf wetness is fully favourable
LOW_BELOW, HIGH_FROM = 35, 65

ALL_SEASONS = ("summer", "monsoon", "post_monsoon", "winter")

# temp = preferred (min, max) in °C, rh = humidity % at which the disease thrives.
CROPS = {
    "maize": {"label": "Maize", "diseases": [
        {"name": "Gray leaf spot", "temp": (22, 30), "rh": 85, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Rotate crops, manage residue and scout the lower leaves."},
        {"name": "Northern corn leaf blight", "temp": (18, 27), "rh": 85, "seasons": ("monsoon", "post_monsoon", "winter"),
         "tip": "Use resistant hybrids and scout for long cigar-shaped lesions."},
        {"name": "Common rust", "temp": (16, 25), "rh": 90, "seasons": ("post_monsoon", "winter"),
         "tip": "Scout both leaf surfaces for rusty pustules before tasseling."},
    ]},
    "rice": {"label": "Rice", "diseases": [
        {"name": "Blast", "temp": (20, 30), "rh": 90, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Avoid excess nitrogen and scout for diamond-shaped leaf spots."},
        {"name": "Bacterial leaf blight", "temp": (25, 34), "rh": 70, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Use clean seed, avoid excess nitrogen and drain fields after storms."},
        {"name": "Sheath blight", "temp": (28, 32), "rh": 85, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Keep proper plant spacing and avoid dense, over-fertilised stands."},
    ]},
    "potatoes": {"label": "Potatoes", "diseases": [
        {"name": "Late blight", "temp": (10, 24), "rh": 90, "seasons": ("monsoon", "post_monsoon", "winter"),
         "tip": "Scout daily in cool, wet spells and protect foliage before infection periods."},
        {"name": "Early blight", "temp": (24, 29), "rh": 80, "seasons": ("summer", "monsoon", "post_monsoon"),
         "tip": "Keep plants well nourished, rotate crops and remove infected debris."},
    ]},
    "soybeans": {"label": "Soybeans", "diseases": [
        {"name": "Soybean rust", "temp": (15, 28), "rh": 85, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Scout from flowering onward and act at first symptoms if risk stays high."},
        {"name": "Frogeye leaf spot", "temp": (22, 30), "rh": 85, "seasons": ("monsoon", "summer"),
         "tip": "Use resistant varieties, rotate crops and avoid working in wet fields."},
    ]},
    "wheat": {"label": "Wheat", "diseases": [
        {"name": "Stripe (yellow) rust", "temp": (8, 15), "rh": 85, "seasons": ("winter",),
         "tip": "Use resistant varieties and scout for yellow stripes on leaves."},
        {"name": "Leaf (brown) rust", "temp": (15, 25), "rh": 85, "seasons": ("winter", "post_monsoon"),
         "tip": "Scout for orange-brown pustules and avoid very late sowing."},
    ]},
    "tomatoes": {"label": "Tomatoes", "diseases": [
        {"name": "Late blight", "temp": (10, 24), "rh": 90, "seasons": ("monsoon", "post_monsoon", "winter"),
         "tip": "Improve airflow, avoid overhead irrigation and scout daily in wet spells."},
        {"name": "Early blight", "temp": (24, 29), "rh": 80, "seasons": ("summer", "monsoon", "post_monsoon"),
         "tip": "Stake plants, mulch the soil and remove infected lower leaves."},
        {"name": "Bacterial spot", "temp": (24, 30), "rh": 85, "seasons": ("monsoon", "summer"),
         "tip": "Use clean seed and transplants and avoid handling wet plants."},
    ]},
    "cotton": {"label": "Cotton", "diseases": [
        {"name": "Bacterial blight", "temp": (25, 35), "rh": 80, "seasons": ("monsoon",),
         "tip": "Use certified seed and avoid working in wet fields."},
        {"name": "Alternaria leaf spot", "temp": (25, 30), "rh": 85, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Maintain balanced nutrition, especially potassium, and scout older leaves."},
        {"name": "Boll rot", "temp": (25, 32), "rh": 85, "seasons": ("monsoon", "post_monsoon"),
         "tip": "Improve canopy airflow and avoid late irrigation during boll opening."},
    ]},
}

RECOMMENDATIONS = {
    "low": "Conditions are not favourable for disease right now. Continue routine scouting.",
    "medium": "Monitor crops closely, ensure proper ventilation and scout every 2-3 days.",
    "high": "High risk: scout daily, remove infected plant material and consider a protective spray as advised by your local agricultural officer.",
}


def list_crops():
    return [{"value": key, "label": c["label"]} for key, c in CROPS.items()]


def _temp_fav(t, lo, hi):
    if lo <= t <= hi:
        return 1.0
    gap = lo - t if t < lo else t - hi
    return max(0.0, 1 - gap / TEMP_TOLERANCE_C)


def _humidity_fav(h, rh):
    return min(1.0, max(0.0, (h - (rh - HUMIDITY_RAMP)) / HUMIDITY_RAMP))


def _rain_fav(r):
    return min(1.0, r / RAIN_FULL_MM)


def _status(v):
    return "favourable" if v >= 1 else "partial" if v > 0 else "unfavourable"


def _level(score):
    return "low" if score < LOW_BELOW else "medium" if score < HIGH_FROM else "high"


def assess(crop, rainfall, temperature, humidity, pesticide_days, season):
    """Return a risk assessment dict, or raise KeyError for an unknown crop."""
    info = CROPS[crop]
    protection = PESTICIDE_PROTECTION[pesticide_days]

    threats = []
    for d in info["diseases"]:
        lo, hi = d["temp"]
        t_fav = _temp_fav(temperature, lo, hi)
        h_fav = _humidity_fav(humidity, d["rh"])
        r_fav = _rain_fav(rainfall)
        season_factor = 1.0 if season in d["seasons"] else OFF_SEASON_FACTOR

        score = 100 * t_fav * (0.65 * h_fav + 0.35 * r_fav) * protection * season_factor

        factors = [
            {"status": _status(t_fav), "text": f"Temperature {temperature:g}°C vs preferred {lo}-{hi}°C"},
            {"status": _status(h_fav), "text": f"Humidity {humidity:g}% vs about {d['rh']}% needed"},
            {"status": _status(r_fav), "text": f"Recent rainfall {rainfall:g} mm (leaf wetness)"},
        ]
        if protection < 1:
            factors.append({"status": "favourable", "text": "A recent protective spray lowers the risk"})
        if season_factor < 1:
            factors.append({"status": "favourable", "text": "Less typical in the selected season"})

        threats.append({
            "name": d["name"],
            "score": round(score),
            "level": _level(score),
            "tip": d["tip"],
            "factors": factors,
        })

    threats.sort(key=lambda x: x["score"], reverse=True)
    top = threats[0]
    return {
        "crop": crop,
        "crop_label": info["label"],
        "risk_level": top["level"],
        "risk_score": top["score"],
        "recommendation": RECOMMENDATIONS[top["level"]],
        "threats": threats,
        "method": "rule_based",
    }
