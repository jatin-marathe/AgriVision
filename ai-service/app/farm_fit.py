"""Farm-fit rules for the crop recommender (NOT part of the trained model).

The crop model is trained on soil and climate data only (N, P, K, temperature,
humidity, pH, rainfall); its dataset has no water-availability, market,
experience or farm-size columns. These four inputs therefore re-weight the
model's probabilities with fixed, documented rules:

    final match = model probability x water x experience x market x size factor

Every factor is 1.0 when the input is not supplied, so omitting all four gives
exactly the plain model output. The factors and per-crop traits below are
approximate general guidance; review them with a local agronomist.
"""

WATER_LEVELS = {"low": 1, "medium": 2, "high": 3}
WATER_LABELS = {"low": "limited (rainfed)", "medium": "moderate", "high": "good irrigation"}
NEED_LABELS = {1: "low", 2: "medium", 3: "high"}
# factor when a crop needs more water than is available, by how many levels
WATER_PENALTY = {1: 0.70, 2: 0.40}

EXPERIENCE_LEVELS = {"beginner": 1, "intermediate": 2, "experienced": 3}
# factor when a crop is more demanding than the farmer's level, by how many levels
EXPERIENCE_PENALTY = {1: 0.85, 2: 0.60}

MARKET_MISMATCH = 0.75      # crop's main market group differs from the stated preference

SMALL_PLOT_HA = 0.5         # below this, tree/plantation crops are strongly discouraged
MEDIUM_PLOT_HA = 2.0
SMALL_PLOT_FACTOR = 0.70
MEDIUM_PLOT_FACTOR = 0.90

# crop: (difficulty 1 easy .. 3 demanding, market group, display market type)
CROP_TRAITS = {
    "rice": (2, "food", "Food Grain"),
    "maize": (1, "food", "Food Grain"),
    "chickpea": (1, "food", "Pulse"),
    "kidneybeans": (2, "food", "Pulse"),
    "pigeonpeas": (1, "food", "Pulse"),
    "mothbeans": (1, "food", "Pulse"),
    "mungbean": (1, "food", "Pulse"),
    "blackgram": (1, "food", "Pulse"),
    "lentil": (1, "food", "Pulse"),
    "pomegranate": (3, "cash", "Fruit"),
    "banana": (3, "cash", "Fruit"),
    "mango": (2, "cash", "Fruit"),
    "grapes": (3, "cash", "Fruit"),
    "watermelon": (2, "cash", "Fruit"),
    "muskmelon": (2, "cash", "Fruit"),
    "apple": (3, "cash", "Fruit"),
    "orange": (2, "cash", "Fruit"),
    "papaya": (2, "cash", "Fruit"),
    "coconut": (2, "cash", "Plantation Crop"),
    "cotton": (3, "cash", "Cash Crop"),
    "jute": (2, "cash", "Cash Crop"),
    "coffee": (3, "cash", "Plantation Crop"),
}


def market_type(crop):
    traits = CROP_TRAITS.get(crop)
    return traits[2] if traits else None


def assess(crop, info, water=None, experience=None, market=None, area_ha=None):
    """Return (factor, notes) for one crop. `notes` is a list of {status, text}."""
    factor = 1.0
    notes = []
    traits = CROP_TRAITS.get(crop)

    if water in WATER_LEVELS:
        need = WATER_LEVELS.get(str(info.get("water", "Medium")).lower(), 2)
        have = WATER_LEVELS[water]
        if need > have:
            factor *= WATER_PENALTY[min(need - have, 2)]
            notes.append({"status": "warn", "text": f"Needs {NEED_LABELS[need]} water, but your availability is {WATER_LABELS[water]}"})
        else:
            notes.append({"status": "ok", "text": f"Water need ({NEED_LABELS[need]}) is covered by your {WATER_LABELS[water]} availability"})

    if traits and experience in EXPERIENCE_LEVELS:
        gap = traits[0] - EXPERIENCE_LEVELS[experience]
        if gap > 0:
            factor *= EXPERIENCE_PENALTY[min(gap, 2)]
            notes.append({"status": "warn", "text": f"Demanding crop for a {experience} farmer"})
        else:
            notes.append({"status": "ok", "text": f"Manageable for a {experience} farmer"})

    if traits and market in ("food", "cash"):
        if traits[1] == market:
            notes.append({"status": "ok", "text": f"Matches your {market}-crop preference ({traits[2]})"})
        else:
            factor *= MARKET_MISMATCH
            notes.append({"status": "warn", "text": f"Mainly a {traits[1]} crop ({traits[2]}); you prefer {market} crops"})

    if area_ha is not None and info.get("duration") == "Perennial":
        if area_ha < SMALL_PLOT_HA:
            factor *= SMALL_PLOT_FACTOR
            notes.append({"status": "warn", "text": f"Long-term tree/plantation crop on a very small plot ({area_ha:g} ha)"})
        elif area_ha < MEDIUM_PLOT_HA:
            factor *= MEDIUM_PLOT_FACTOR
            notes.append({"status": "warn", "text": f"Long-term tree/plantation crop on a small plot ({area_ha:g} ha)"})

    return factor, notes
