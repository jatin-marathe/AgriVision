"""Static agronomy reference for the 22 crops in the Kaggle crop dataset.

These are typical, general values (not model outputs). Used only for display
(duration, water need) and the optional season / soil suitability checks.
"""

CROP_INFO = {
    "rice":        {"name": "Rice",         "duration": "90-150 days",  "water": "High",   "seasons": ["kharif"],                       "soils": ["clay", "alluvial", "loamy"]},
    "maize":       {"name": "Maize",        "duration": "80-110 days",  "water": "Medium", "seasons": ["kharif", "rabi", "zaid"],       "soils": ["loamy", "alluvial", "red", "sandy"]},
    "chickpea":    {"name": "Chickpea",     "duration": "90-120 days",  "water": "Low",    "seasons": ["rabi"],                         "soils": ["loamy", "black", "sandy", "red"]},
    "kidneybeans": {"name": "Kidney Beans", "duration": "90-120 days",  "water": "Medium", "seasons": ["kharif", "rabi"],               "soils": ["loamy", "alluvial"]},
    "pigeonpeas":  {"name": "Pigeon Peas",  "duration": "150-200 days", "water": "Low",    "seasons": ["kharif"],                       "soils": ["red", "black", "loamy", "alluvial"]},
    "mothbeans":   {"name": "Moth Beans",   "duration": "60-90 days",   "water": "Low",    "seasons": ["kharif"],                       "soils": ["sandy", "loamy"]},
    "mungbean":    {"name": "Mung Bean",    "duration": "60-75 days",   "water": "Low",    "seasons": ["kharif", "zaid"],               "soils": ["loamy", "sandy", "alluvial"]},
    "blackgram":   {"name": "Black Gram",   "duration": "70-90 days",   "water": "Low",    "seasons": ["kharif", "zaid"],               "soils": ["loamy", "black", "clay"]},
    "lentil":      {"name": "Lentil",       "duration": "100-120 days", "water": "Low",    "seasons": ["rabi"],                         "soils": ["loamy", "alluvial", "clay"]},
    "pomegranate": {"name": "Pomegranate",  "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["loamy", "sandy", "red", "alluvial"]},
    "banana":      {"name": "Banana",       "duration": "11-14 months", "water": "High",   "seasons": ["year_round"],                   "soils": ["loamy", "alluvial", "clay"]},
    "mango":       {"name": "Mango",        "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["alluvial", "loamy", "red", "laterite"]},
    "grapes":      {"name": "Grapes",       "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["sandy", "loamy", "red"]},
    "watermelon":  {"name": "Watermelon",   "duration": "80-100 days",  "water": "Medium", "seasons": ["zaid"],                         "soils": ["sandy", "loamy", "alluvial"]},
    "muskmelon":   {"name": "Muskmelon",    "duration": "70-90 days",   "water": "Medium", "seasons": ["zaid"],                         "soils": ["sandy", "loamy", "alluvial"]},
    "apple":       {"name": "Apple",        "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["loamy"]},
    "orange":      {"name": "Orange",       "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["loamy", "alluvial", "red", "laterite"]},
    "papaya":      {"name": "Papaya",       "duration": "9-12 months",  "water": "Medium", "seasons": ["year_round"],                   "soils": ["loamy", "sandy"]},
    "coconut":     {"name": "Coconut",      "duration": "Perennial",    "water": "High",   "seasons": ["year_round"],                   "soils": ["laterite", "sandy", "alluvial", "red"]},
    "cotton":      {"name": "Cotton",       "duration": "150-180 days", "water": "Medium", "seasons": ["kharif"],                       "soils": ["black", "alluvial", "red"]},
    "jute":        {"name": "Jute",         "duration": "100-120 days", "water": "High",   "seasons": ["kharif"],                       "soils": ["alluvial", "loamy", "clay"]},
    "coffee":      {"name": "Coffee",       "duration": "Perennial",    "water": "Medium", "seasons": ["year_round"],                   "soils": ["laterite", "red", "loamy"]},
}
