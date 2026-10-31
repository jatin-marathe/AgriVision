"""Rule-based fertilizer (NPK) calculator (NOT a trained ML model).

No dataset of field trials is bundled, so recommendations start from commonly
cited general recommended doses per crop (kg/ha of N, P2O5 and K2O), then apply
documented adjustments for soil type, rainfall and soil pH. The doses and
split schedules are approximate general guidance. Always confirm them against
a soil test and your state agricultural university's package of practices.
"""

SOILS = ("clay", "sandy", "loamy", "silt", "red", "black", "alluvial")
STAGES = ("basal", "vegetative", "flowering", "maturity")
PH_CLASSES = ("unknown", "acidic", "slightly_acidic", "neutral", "alkaline")

STAGE_LABELS = {
    "basal": "Pre-planting / Basal",
    "vegetative": "Vegetative Growth",
    "flowering": "Flowering / Fruiting",
    "maturity": "Maturity / Grain filling",
}

# Nutrient content of common fertilizer products (fractions).
UREA_N = 0.46
DAP_N, DAP_P2O5 = 0.18, 0.46
MOP_K2O = 0.60

HIGH_RAIN_MM = 1500   # above this, nitrogen is topped up to offset leaching
LOW_RAIN_MM = 600     # below this, rainfed crops get lower doses


def _s(stage, timing, n, p, k):
    return {"stage": stage, "timing": timing, "n": n, "p": p, "k": k}


# dose = (N, P2O5, K2O) kg/ha. schedule percentages per nutrient sum to 100.
CROPS = {
    "maize": {"label": "Maize (Corn)", "dose": (120, 60, 40), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 40, 100, 40),
                     _s("vegetative", "About 25 days after sowing", 40, 0, 40),
                     _s("flowering", "About 45 days after sowing (knee-high to tasseling)", 20, 0, 20)],
        "notes": ["Zinc deficiency is common in maize; apply zinc sulphate if a soil test shows low zinc."]},
    "rice": {"label": "Rice (Paddy)", "dose": (120, 60, 40), "rainfed": False,
        "schedule": [_s("basal", "At transplanting (or last puddling)", 50, 100, 50),
                     _s("vegetative", "Active tillering, about 21 days after transplanting", 25, 0, 0),
                     _s("flowering", "Panicle initiation, about 42-45 days", 25, 0, 50)],
        "notes": ["Keep a thin water layer when top-dressing nitrogen and avoid applying just before heavy rain."]},
    "potatoes": {"label": "Potatoes", "dose": (150, 80, 100), "rainfed": False,
        "schedule": [_s("basal", "At planting", 50, 100, 100),
                     _s("vegetative", "At earthing up, about 25-30 days after planting", 50, 0, 0)],
        "notes": ["Band the fertilizer beside the seed tubers, not in contact with them."]},
    "soybeans": {"label": "Soybeans", "dose": (30, 60, 40), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 100, 100, 100)],
        "notes": ["Treat seed with Rhizobium culture; legumes fix much of their own nitrogen."]},
    "wheat": {"label": "Wheat", "dose": (120, 60, 40), "rainfed": False,
        "schedule": [_s("basal", "At sowing", 50, 100, 100),
                     _s("vegetative", "Crown root initiation, about 21 days", 25, 0, 0),
                     _s("flowering", "First node / jointing, about 45 days", 25, 0, 0)],
        "notes": ["Irrigate after top-dressing nitrogen."]},
    "sorghum": {"label": "Sorghum", "dose": (80, 40, 40), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 50, 100, 100),
                     _s("vegetative", "Top-dress about 30 days after sowing", 50, 0, 0)],
        "notes": ["Top-dress only when the soil has adequate moisture."]},
    "cotton": {"label": "Cotton", "dose": (120, 60, 60), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 25, 100, 50),
                     _s("vegetative", "Squaring, about 30-35 days", 50, 0, 0),
                     _s("flowering", "Flowering / boll formation, about 60-70 days", 25, 0, 50)],
        "notes": ["Split nitrogen to avoid excess vegetative growth."]},
    "sugarcane": {"label": "Sugarcane", "dose": (250, 100, 120), "rainfed": False,
        "schedule": [_s("basal", "At planting", 25, 100, 50),
                     _s("vegetative", "Tillering, about 45 days", 50, 0, 0),
                     _s("flowering", "Grand growth, about 90 days", 25, 0, 50)],
        "notes": ["Apply with irrigation and earth up after top-dressing."]},
    "tomatoes": {"label": "Tomatoes", "dose": (120, 60, 60), "rainfed": False,
        "schedule": [_s("basal", "At transplanting", 40, 100, 40),
                     _s("vegetative", "Flowering onset, about 30 days", 30, 0, 30),
                     _s("flowering", "Fruit set, about 60 days", 30, 0, 30)],
        "notes": ["Keep irrigation even; uneven moisture can cause blossom-end rot."]},
    "onion": {"label": "Onion", "dose": (100, 50, 50), "rainfed": False,
        "schedule": [_s("basal", "At transplanting", 50, 100, 100),
                     _s("vegetative", "About 30 days after transplanting", 25, 0, 0),
                     _s("flowering", "Bulb initiation, about 45-50 days", 25, 0, 0)],
        "notes": ["Stop nitrogen before bulbs mature to improve storage life; sulphur supports bulb quality."]},
    "groundnut": {"label": "Groundnut", "dose": (25, 50, 50), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 100, 100, 100)],
        "notes": ["Apply gypsum at flowering/pegging as per local advice; legumes fix much of their own nitrogen."]},
    "sunflower": {"label": "Sunflower", "dose": (60, 60, 40), "rainfed": True,
        "schedule": [_s("basal", "At sowing", 50, 100, 100),
                     _s("vegetative", "Top-dress about 30 days after sowing", 50, 0, 0)],
        "notes": ["Boron deficiency can reduce seed set; consider a foliar boron spray if soil tests are low."]},
}

GENERAL_NOTES = [
    "These are general recommendations. Always conduct soil testing for precise needs.",
    "Apply fertilizers based on weather conditions and soil moisture.",
    "P and K are given as P2O5 and K2O, the standard fertilizer basis.",
]


def list_crops():
    return [{"value": key, "label": c["label"]} for key, c in CROPS.items()]


def _adjustments(soil, rainfall, ph, rainfed):
    f = {"n": 1.0, "p": 1.0, "k": 1.0}
    notes = []
    if soil == "sandy":
        f["n"] *= 1.10
        f["k"] *= 1.10
        notes.append("Sandy soil: N and K increased 10% (low nutrient retention).")
    if soil == "red":
        f["p"] *= 1.10
        notes.append("Red soil: P increased 10% (phosphorus fixation).")
    if rainfall > HIGH_RAIN_MM:
        f["n"] *= 1.10
        notes.append(f"Rainfall above {HIGH_RAIN_MM} mm: N increased 10% to offset leaching.")
    if rainfed and rainfall < LOW_RAIN_MM:
        for k in f:
            f[k] *= 0.85
        notes.append(f"Rainfall below {LOW_RAIN_MM} mm on a rainfed crop: all doses reduced 15% (lower yield potential).")
    if ph == "acidic":
        f["p"] *= 1.10
        notes.append("Acidic soil (pH below 6.0): P increased 10%; consider liming after a soil test.")
    elif ph == "alkaline":
        f["p"] *= 1.10
        notes.append("Alkaline soil (pH above 7.5): P increased 10% (phosphorus fixation); watch for micronutrient deficiency.")
    return f, notes


def recommend(crop, rainfall, soil, area_ha, stage, ph):
    """Return a recommendation dict, or raise KeyError for an unknown crop."""
    info = CROPS[crop]
    n0, p0, k0 = info["dose"]
    f, adjustments = _adjustments(soil, rainfall, ph, info["rainfed"])

    n, p, k = round(n0 * f["n"]), round(p0 * f["p"]), round(k0 * f["k"])

    # Product equivalents: DAP supplies all P2O5 (and some N); urea covers the remaining N.
    dap = p / DAP_P2O5
    urea = max(0.0, n - dap * DAP_N) / UREA_N
    mop = k / MOP_K2O
    per_ha_products = {"urea": urea, "dap": dap, "mop": mop}

    schedule = []
    current = None
    for s in info["schedule"]:
        row = {
            "stage": s["stage"],
            "stage_label": STAGE_LABELS[s["stage"]],
            "timing": s["timing"],
            "n": round(n * s["n"] / 100, 1),
            "p2o5": round(p * s["p"] / 100, 1),
            "k2o": round(k * s["k"] / 100, 1),
            "current": s["stage"] == stage,
        }
        schedule.append(row)
        if row["current"]:
            current = row

    if stage == "maturity":
        stage_message = "Fertilizer is not normally applied at maturity / grain filling."
    elif current:
        stage_message = (
            f"At the {STAGE_LABELS[stage].lower()} stage apply "
            f"{current['n']:g} kg N, {current['p2o5']:g} kg P2O5 and {current['k2o']:g} kg K2O per hectare."
        )
    else:
        stage_message = f"This crop has no scheduled application at the {STAGE_LABELS[stage].lower()} stage."

    return {
        "crop": crop,
        "crop_label": info["label"],
        "area_ha": area_ha,
        "per_hectare": {"n": n, "p2o5": p, "k2o": k},
        "field_total": {"n": round(n * area_ha, 1), "p2o5": round(p * area_ha, 1), "k2o": round(k * area_ha, 1)},
        "products": {
            "per_hectare": {key: round(v, 1) for key, v in per_ha_products.items()},
            "field_total": {key: round(v * area_ha, 1) for key, v in per_ha_products.items()},
        },
        "schedule": schedule,
        "stage_label": STAGE_LABELS[stage],
        "stage_message": stage_message,
        "adjustments": adjustments,
        "notes": GENERAL_NOTES + info["notes"],
        "method": "rule_based",
    }
