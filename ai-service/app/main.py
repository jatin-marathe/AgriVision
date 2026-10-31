
# # # # from contextlib import asynccontextmanager
# # # # from pathlib import Path
# # # # from typing import Literal, Optional

# # # # import joblib
# # # # import pandas as pd
# # # # from fastapi import FastAPI, HTTPException
# # # # from pydantic import BaseModel, Field

# # # # from crop_info import CROP_INFO

# # # # MODEL_PATH = Path(__file__).parent / "model" / "crop_model.joblib"
# # # # state = {}

# # # # LABELS = {
# # # #     "N": "Nitrogen (N)",
# # # #     "P": "Phosphorus (P)",
# # # #     "K": "Potassium (K)",
# # # #     "temperature": "Temperature",
# # # #     "humidity": "Humidity",
# # # #     "ph": "Soil pH",
# # # #     "rainfall": "Rainfall",
# # # # }
# # # # UNITS = {"temperature": "°C", "humidity": "%", "rainfall": "mm"}
# # # # SOIL_LABELS = {"clay": "clay", "sandy": "sandy", "loamy": "loamy", "black": "black cotton",
# # # #                "red": "red", "alluvial": "alluvial", "laterite": "laterite"}


# # # # @asynccontextmanager
# # # # async def lifespan(_app: FastAPI):
# # # #     if MODEL_PATH.exists():
# # # #         state["bundle"] = joblib.load(MODEL_PATH)
# # # #     yield


# # # # app = FastAPI(title="AgriVision AI Service", lifespan=lifespan)


# # # # class CropInput(BaseModel):
# # # #     N: float = Field(ge=0, le=200)
# # # #     P: float = Field(ge=0, le=200)
# # # #     K: float = Field(ge=0, le=300)
# # # #     temperature: float = Field(ge=0, le=50)
# # # #     humidity: float = Field(ge=0, le=100)
# # # #     ph: float = Field(ge=0, le=14)
# # # #     rainfall: float = Field(ge=0, le=500)
# # # #     season: Optional[Literal["kharif", "rabi", "zaid", "year_round"]] = None
# # # #     soil_type: Optional[Literal["clay", "sandy", "loamy", "black", "red", "alluvial", "laterite"]] = None


# # # # def _fmt(v: float) -> str:
# # # #     return f"{v:.1f}".rstrip("0").rstrip(".")


# # # # def _checks(crop: str, body: CropInput, ranges: dict) -> list:
# # # #     checks = []
# # # #     for feat, (lo, hi) in ranges.items():
# # # #         value, unit, label = getattr(body, feat), UNITS.get(feat, ""), LABELS[feat]
# # # #         span = f"{_fmt(lo)}-{_fmt(hi)}{unit}"
# # # #         if value < lo:
# # # #             checks.append({"status": "warn", "text": f"{label} is below the typical range ({span})"})
# # # #         elif value > hi:
# # # #             checks.append({"status": "warn", "text": f"{label} is above the typical range ({span})"})
# # # #         else:
# # # #             checks.append({"status": "ok", "text": f"{label} within typical range ({span})"})

# # # #     info = CROP_INFO.get(crop)
# # # #     if info and body.season and body.season != "year_round":
# # # #         if body.season in info["seasons"] or "year_round" in info["seasons"]:
# # # #             checks.append({"status": "ok", "text": f"Suitable for {body.season} season"})
# # # #         else:
# # # #             checks.append({"status": "warn", "text": f"Usually grown in {', '.join(info['seasons'])}, not {body.season}"})
# # # #     if info and body.soil_type:
# # # #         soil = SOIL_LABELS[body.soil_type]
# # # #         if body.soil_type in info["soils"]:
# # # #             checks.append({"status": "ok", "text": f"Suitable for {soil} soil"})
# # # #         else:
# # # #             checks.append({"status": "warn", "text": f"{soil.capitalize()} soil is not ideal for this crop"})
# # # #     return checks


# # # # @app.get("/health")
# # # # def health():
# # # #     return {"status": "ok", "model_loaded": "bundle" in state}


# # # # @app.post("/predict")
# # # # def predict(body: CropInput):
# # # #     bundle = state.get("bundle")
# # # #     if bundle is None:
# # # #         raise HTTPException(status_code=503, detail="Model not trained yet. Run `python train.py` in ai-service.")

# # # #     features = bundle["features"]
# # # #     row = pd.DataFrame([[getattr(body, f) for f in features]], columns=features)
# # # #     probs = bundle["model"].predict_proba(row)[0]
# # # #     classes = bundle["model"].classes_

# # # #     order = probs.argsort()[::-1][:5]
# # # #     recommendations = []
# # # #     for idx in order:
# # # #         p = float(probs[idx])
# # # #         if p < 0.01 and recommendations:
# # # #             break
# # # #         crop = str(classes[idx])
# # # #         info = CROP_INFO.get(crop, {})
# # # #         level = "high" if p >= 0.6 else "medium" if p >= 0.25 else "low"
# # # #         recommendations.append({
# # # #             "crop": crop,
# # # #             "name": info.get("name", crop.title()),
# # # #             "confidence": round(p * 100, 1),
# # # #             "level": level,
# # # #             "recommendation": {"high": "Highly Recommended", "medium": "Recommended", "low": "Possible Option"}[level],
# # # #             "duration": info.get("duration"),
# # # #             "water_need": info.get("water"),
# # # #             "seasons": info.get("seasons", []),
# # # #             "checks": _checks(crop, body, bundle["crop_ranges"][crop]),
# # # #         })

# # # #     warnings = []
# # # #     for feat, (lo, hi) in bundle["bounds"].items():
# # # #         value = getattr(body, feat)
# # # #         if value < lo or value > hi:
# # # #             warnings.append(
# # # #                 f"{LABELS[feat]} ({_fmt(value)}) is outside the range the model was trained on "
# # # #                 f"({_fmt(lo)}-{_fmt(hi)}); treat results with caution."
# # # #             )

# # # #     return {
# # # #         "recommendations": recommendations,
# # # #         "warnings": warnings,
# # # #         "model": {"accuracy": round(bundle["accuracy"] * 100, 1), "rows": bundle["rows"]},
# # # #     }

# # # from contextlib import asynccontextmanager
# # # from pathlib import Path
# # # from typing import Literal, Optional

# # # import joblib
# # # import pandas as pd
# # # from fastapi import FastAPI, HTTPException
# # # from pydantic import BaseModel, Field

# # # from crop_info import CROP_INFO
# # # from yield_routes import router as yield_router

# # # MODEL_PATH = Path(__file__).parent / "model" / "crop_model.joblib"
# # # state = {}

# # # LABELS = {
# # #     "N": "Nitrogen (N)",
# # #     "P": "Phosphorus (P)",
# # #     "K": "Potassium (K)",
# # #     "temperature": "Temperature",
# # #     "humidity": "Humidity",
# # #     "ph": "Soil pH",
# # #     "rainfall": "Rainfall",
# # # }
# # # UNITS = {"temperature": "°C", "humidity": "%", "rainfall": "mm"}
# # # SOIL_LABELS = {"clay": "clay", "sandy": "sandy", "loamy": "loamy", "black": "black cotton",
# # #                "red": "red", "alluvial": "alluvial", "laterite": "laterite"}


# # # @asynccontextmanager
# # # async def lifespan(_app: FastAPI):
# # #     if MODEL_PATH.exists():
# # #         state["bundle"] = joblib.load(MODEL_PATH)
# # #     yield


# # # app = FastAPI(title="AgriVision AI Service", lifespan=lifespan)
# # # app.include_router(yield_router)


# # # class CropInput(BaseModel):
# # #     N: float = Field(ge=0, le=200)
# # #     P: float = Field(ge=0, le=200)
# # #     K: float = Field(ge=0, le=300)
# # #     temperature: float = Field(ge=0, le=50)
# # #     humidity: float = Field(ge=0, le=100)
# # #     ph: float = Field(ge=0, le=14)
# # #     rainfall: float = Field(ge=0, le=500)
# # #     season: Optional[Literal["kharif", "rabi", "zaid", "year_round"]] = None
# # #     soil_type: Optional[Literal["clay", "sandy", "loamy", "black", "red", "alluvial", "laterite"]] = None


# # # def _fmt(v: float) -> str:
# # #     return f"{v:.1f}".rstrip("0").rstrip(".")


# # # def _checks(crop: str, body: CropInput, ranges: dict) -> list:
# # #     checks = []
# # #     for feat, (lo, hi) in ranges.items():
# # #         value, unit, label = getattr(body, feat), UNITS.get(feat, ""), LABELS[feat]
# # #         span = f"{_fmt(lo)}-{_fmt(hi)}{unit}"
# # #         if value < lo:
# # #             checks.append({"status": "warn", "text": f"{label} is below the typical range ({span})"})
# # #         elif value > hi:
# # #             checks.append({"status": "warn", "text": f"{label} is above the typical range ({span})"})
# # #         else:
# # #             checks.append({"status": "ok", "text": f"{label} within typical range ({span})"})

# # #     info = CROP_INFO.get(crop)
# # #     if info and body.season and body.season != "year_round":
# # #         if body.season in info["seasons"] or "year_round" in info["seasons"]:
# # #             checks.append({"status": "ok", "text": f"Suitable for {body.season} season"})
# # #         else:
# # #             checks.append({"status": "warn", "text": f"Usually grown in {', '.join(info['seasons'])}, not {body.season}"})
# # #     if info and body.soil_type:
# # #         soil = SOIL_LABELS[body.soil_type]
# # #         if body.soil_type in info["soils"]:
# # #             checks.append({"status": "ok", "text": f"Suitable for {soil} soil"})
# # #         else:
# # #             checks.append({"status": "warn", "text": f"{soil.capitalize()} soil is not ideal for this crop"})
# # #     return checks


# # # @app.get("/health")
# # # def health():
# # #     return {"status": "ok", "model_loaded": "bundle" in state}


# # # @app.post("/predict")
# # # def predict(body: CropInput):
# # #     bundle = state.get("bundle")
# # #     if bundle is None:
# # #         raise HTTPException(status_code=503, detail="Model not trained yet. Run `python train.py` in ai-service.")

# # #     features = bundle["features"]
# # #     row = pd.DataFrame([[getattr(body, f) for f in features]], columns=features)
# # #     probs = bundle["model"].predict_proba(row)[0]
# # #     classes = bundle["model"].classes_

# # #     order = probs.argsort()[::-1][:5]
# # #     recommendations = []
# # #     for idx in order:
# # #         p = float(probs[idx])
# # #         if p < 0.01 and recommendations:
# # #             break
# # #         crop = str(classes[idx])
# # #         info = CROP_INFO.get(crop, {})
# # #         level = "high" if p >= 0.6 else "medium" if p >= 0.25 else "low"
# # #         recommendations.append({
# # #             "crop": crop,
# # #             "name": info.get("name", crop.title()),
# # #             "confidence": round(p * 100, 1),
# # #             "level": level,
# # #             "recommendation": {"high": "Highly Recommended", "medium": "Recommended", "low": "Possible Option"}[level],
# # #             "duration": info.get("duration"),
# # #             "water_need": info.get("water"),
# # #             "seasons": info.get("seasons", []),
# # #             "checks": _checks(crop, body, bundle["crop_ranges"][crop]),
# # #         })

# # #     warnings = []
# # #     for feat, (lo, hi) in bundle["bounds"].items():
# # #         value = getattr(body, feat)
# # #         if value < lo or value > hi:
# # #             warnings.append(
# # #                 f"{LABELS[feat]} ({_fmt(value)}) is outside the range the model was trained on "
# # #                 f"({_fmt(lo)}-{_fmt(hi)}); treat results with caution."
# # #             )

# # #     return {
# # #         "recommendations": recommendations,
# # #         "warnings": warnings,
# # #         "model": {"accuracy": round(bundle["accuracy"] * 100, 1), "rows": bundle["rows"]},
# # #     }

# # from contextlib import asynccontextmanager
# # from pathlib import Path
# # from typing import Literal, Optional

# # import joblib
# # import pandas as pd
# # from fastapi import FastAPI, HTTPException
# # from pydantic import BaseModel, Field

# # from crop_info import CROP_INFO
# # from yield_routes import router as yield_router
# # from disease_routes import router as disease_router

# # MODEL_PATH = Path(__file__).parent / "model" / "crop_model.joblib"
# # state = {}

# # LABELS = {
# #     "N": "Nitrogen (N)",
# #     "P": "Phosphorus (P)",
# #     "K": "Potassium (K)",
# #     "temperature": "Temperature",
# #     "humidity": "Humidity",
# #     "ph": "Soil pH",
# #     "rainfall": "Rainfall",
# # }
# # UNITS = {"temperature": "°C", "humidity": "%", "rainfall": "mm"}
# # SOIL_LABELS = {"clay": "clay", "sandy": "sandy", "loamy": "loamy", "black": "black cotton",
# #                "red": "red", "alluvial": "alluvial", "laterite": "laterite"}


# # @asynccontextmanager
# # async def lifespan(_app: FastAPI):
# #     if MODEL_PATH.exists():
# #         state["bundle"] = joblib.load(MODEL_PATH)
# #     yield


# # app = FastAPI(title="AgriVision AI Service", lifespan=lifespan)
# # app.include_router(yield_router)
# # app.include_router(disease_router)


# # class CropInput(BaseModel):
# #     N: float = Field(ge=0, le=200)
# #     P: float = Field(ge=0, le=200)
# #     K: float = Field(ge=0, le=300)
# #     temperature: float = Field(ge=0, le=50)
# #     humidity: float = Field(ge=0, le=100)
# #     ph: float = Field(ge=0, le=14)
# #     rainfall: float = Field(ge=0, le=500)
# #     season: Optional[Literal["kharif", "rabi", "zaid", "year_round"]] = None
# #     soil_type: Optional[Literal["clay", "sandy", "loamy", "black", "red", "alluvial", "laterite"]] = None


# # def _fmt(v: float) -> str:
# #     return f"{v:.1f}".rstrip("0").rstrip(".")


# # def _checks(crop: str, body: CropInput, ranges: dict) -> list:
# #     checks = []
# #     for feat, (lo, hi) in ranges.items():
# #         value, unit, label = getattr(body, feat), UNITS.get(feat, ""), LABELS[feat]
# #         span = f"{_fmt(lo)}-{_fmt(hi)}{unit}"
# #         if value < lo:
# #             checks.append({"status": "warn", "text": f"{label} is below the typical range ({span})"})
# #         elif value > hi:
# #             checks.append({"status": "warn", "text": f"{label} is above the typical range ({span})"})
# #         else:
# #             checks.append({"status": "ok", "text": f"{label} within typical range ({span})"})

# #     info = CROP_INFO.get(crop)
# #     if info and body.season and body.season != "year_round":
# #         if body.season in info["seasons"] or "year_round" in info["seasons"]:
# #             checks.append({"status": "ok", "text": f"Suitable for {body.season} season"})
# #         else:
# #             checks.append({"status": "warn", "text": f"Usually grown in {', '.join(info['seasons'])}, not {body.season}"})
# #     if info and body.soil_type:
# #         soil = SOIL_LABELS[body.soil_type]
# #         if body.soil_type in info["soils"]:
# #             checks.append({"status": "ok", "text": f"Suitable for {soil} soil"})
# #         else:
# #             checks.append({"status": "warn", "text": f"{soil.capitalize()} soil is not ideal for this crop"})
# #     return checks


# # @app.get("/health")
# # def health():
# #     return {"status": "ok", "model_loaded": "bundle" in state}


# # @app.post("/predict")
# # def predict(body: CropInput):
# #     bundle = state.get("bundle")
# #     if bundle is None:
# #         raise HTTPException(status_code=503, detail="Model not trained yet. Run `python train.py` in ai-service.")

# #     features = bundle["features"]
# #     row = pd.DataFrame([[getattr(body, f) for f in features]], columns=features)
# #     probs = bundle["model"].predict_proba(row)[0]
# #     classes = bundle["model"].classes_

# #     order = probs.argsort()[::-1][:5]
# #     recommendations = []
# #     for idx in order:
# #         p = float(probs[idx])
# #         if p < 0.01 and recommendations:
# #             break
# #         crop = str(classes[idx])
# #         info = CROP_INFO.get(crop, {})
# #         level = "high" if p >= 0.6 else "medium" if p >= 0.25 else "low"
# #         recommendations.append({
# #             "crop": crop,
# #             "name": info.get("name", crop.title()),
# #             "confidence": round(p * 100, 1),
# #             "level": level,
# #             "recommendation": {"high": "Highly Recommended", "medium": "Recommended", "low": "Possible Option"}[level],
# #             "duration": info.get("duration"),
# #             "water_need": info.get("water"),
# #             "seasons": info.get("seasons", []),
# #             "checks": _checks(crop, body, bundle["crop_ranges"][crop]),
# #         })

# #     warnings = []
# #     for feat, (lo, hi) in bundle["bounds"].items():
# #         value = getattr(body, feat)
# #         if value < lo or value > hi:
# #             warnings.append(
# #                 f"{LABELS[feat]} ({_fmt(value)}) is outside the range the model was trained on "
# #                 f"({_fmt(lo)}-{_fmt(hi)}); treat results with caution."
# #             )

# #     return {
# #         "recommendations": recommendations,
# #         "warnings": warnings,
# #         "model": {"accuracy": round(bundle["accuracy"] * 100, 1), "rows": bundle["rows"]},
# #     }
# from contextlib import asynccontextmanager
# from pathlib import Path
# from typing import Literal, Optional

# import joblib
# import pandas as pd
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel, Field

# from crop_info import CROP_INFO
# from yield_routes import router as yield_router
# from disease_routes import router as disease_router
# from fertilizer_routes import router as fertilizer_router

# MODEL_PATH = Path(__file__).parent / "model" / "crop_model.joblib"
# state = {}

# LABELS = {
#     "N": "Nitrogen (N)",
#     "P": "Phosphorus (P)",
#     "K": "Potassium (K)",
#     "temperature": "Temperature",
#     "humidity": "Humidity",
#     "ph": "Soil pH",
#     "rainfall": "Rainfall",
# }
# UNITS = {"temperature": "°C", "humidity": "%", "rainfall": "mm"}
# SOIL_LABELS = {"clay": "clay", "sandy": "sandy", "loamy": "loamy", "black": "black cotton",
#                "red": "red", "alluvial": "alluvial", "laterite": "laterite"}


# @asynccontextmanager
# async def lifespan(_app: FastAPI):
#     if MODEL_PATH.exists():
#         state["bundle"] = joblib.load(MODEL_PATH)
#     yield


# app = FastAPI(title="AgriVision AI Service", lifespan=lifespan)
# app.include_router(yield_router)
# app.include_router(disease_router)
# app.include_router(fertilizer_router)


# class CropInput(BaseModel):
#     N: float = Field(ge=0, le=200)
#     P: float = Field(ge=0, le=200)
#     K: float = Field(ge=0, le=300)
#     temperature: float = Field(ge=0, le=50)
#     humidity: float = Field(ge=0, le=100)
#     ph: float = Field(ge=0, le=14)
#     rainfall: float = Field(ge=0, le=500)
#     season: Optional[Literal["kharif", "rabi", "zaid", "year_round"]] = None
#     soil_type: Optional[Literal["clay", "sandy", "loamy", "black", "red", "alluvial", "laterite"]] = None


# def _fmt(v: float) -> str:
#     return f"{v:.1f}".rstrip("0").rstrip(".")


# def _checks(crop: str, body: CropInput, ranges: dict) -> list:
#     checks = []
#     for feat, (lo, hi) in ranges.items():
#         value, unit, label = getattr(body, feat), UNITS.get(feat, ""), LABELS[feat]
#         span = f"{_fmt(lo)}-{_fmt(hi)}{unit}"
#         if value < lo:
#             checks.append({"status": "warn", "text": f"{label} is below the typical range ({span})"})
#         elif value > hi:
#             checks.append({"status": "warn", "text": f"{label} is above the typical range ({span})"})
#         else:
#             checks.append({"status": "ok", "text": f"{label} within typical range ({span})"})

#     info = CROP_INFO.get(crop)
#     if info and body.season and body.season != "year_round":
#         if body.season in info["seasons"] or "year_round" in info["seasons"]:
#             checks.append({"status": "ok", "text": f"Suitable for {body.season} season"})
#         else:
#             checks.append({"status": "warn", "text": f"Usually grown in {', '.join(info['seasons'])}, not {body.season}"})
#     if info and body.soil_type:
#         soil = SOIL_LABELS[body.soil_type]
#         if body.soil_type in info["soils"]:
#             checks.append({"status": "ok", "text": f"Suitable for {soil} soil"})
#         else:
#             checks.append({"status": "warn", "text": f"{soil.capitalize()} soil is not ideal for this crop"})
#     return checks


# @app.get("/health")
# def health():
#     return {"status": "ok", "model_loaded": "bundle" in state}


# @app.post("/predict")
# def predict(body: CropInput):
#     bundle = state.get("bundle")
#     if bundle is None:
#         raise HTTPException(status_code=503, detail="Model not trained yet. Run `python train.py` in ai-service.")

#     features = bundle["features"]
#     row = pd.DataFrame([[getattr(body, f) for f in features]], columns=features)
#     probs = bundle["model"].predict_proba(row)[0]
#     classes = bundle["model"].classes_

#     order = probs.argsort()[::-1][:5]
#     recommendations = []
#     for idx in order:
#         p = float(probs[idx])
#         if p < 0.01 and recommendations:
#             break
#         crop = str(classes[idx])
#         info = CROP_INFO.get(crop, {})
#         level = "high" if p >= 0.6 else "medium" if p >= 0.25 else "low"
#         recommendations.append({
#             "crop": crop,
#             "name": info.get("name", crop.title()),
#             "confidence": round(p * 100, 1),
#             "level": level,
#             "recommendation": {"high": "Highly Recommended", "medium": "Recommended", "low": "Possible Option"}[level],
#             "duration": info.get("duration"),
#             "water_need": info.get("water"),
#             "seasons": info.get("seasons", []),
#             "checks": _checks(crop, body, bundle["crop_ranges"][crop]),
#         })

#     warnings = []
#     for feat, (lo, hi) in bundle["bounds"].items():
#         value = getattr(body, feat)
#         if value < lo or value > hi:
#             warnings.append(
#                 f"{LABELS[feat]} ({_fmt(value)}) is outside the range the model was trained on "
#                 f"({_fmt(lo)}-{_fmt(hi)}); treat results with caution."
#             )

#     return {
#         "recommendations": recommendations,
#         "warnings": warnings,
#         "model": {"accuracy": round(bundle["accuracy"] * 100, 1), "rows": bundle["rows"]},
#     }

from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal, Optional

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

import farm_fit
from crop_info import CROP_INFO
from yield_routes import router as yield_router
from disease_routes import router as disease_router
from fertilizer_routes import router as fertilizer_router

MODEL_PATH = Path(__file__).parent / "model" / "crop_model.joblib"
state = {}

LABELS = {
    "N": "Nitrogen (N)",
    "P": "Phosphorus (P)",
    "K": "Potassium (K)",
    "temperature": "Temperature",
    "humidity": "Humidity",
    "ph": "Soil pH",
    "rainfall": "Rainfall",
}
UNITS = {"temperature": "°C", "humidity": "%", "rainfall": "mm"}
SOIL_LABELS = {"clay": "clay", "sandy": "sandy", "loamy": "loamy", "black": "black cotton",
               "red": "red", "alluvial": "alluvial", "laterite": "laterite"}


@asynccontextmanager
async def lifespan(_app: FastAPI):
    if MODEL_PATH.exists():
        state["bundle"] = joblib.load(MODEL_PATH)
    yield


app = FastAPI(title="AgriVision AI Service", lifespan=lifespan)
app.include_router(yield_router)
app.include_router(disease_router)
app.include_router(fertilizer_router)


class CropInput(BaseModel):
    N: float = Field(ge=0, le=200)
    P: float = Field(ge=0, le=200)
    K: float = Field(ge=0, le=300)
    temperature: float = Field(ge=0, le=50)
    humidity: float = Field(ge=0, le=100)
    ph: float = Field(ge=0, le=14)
    rainfall: float = Field(ge=0, le=500)
    season: Optional[Literal["kharif", "rabi", "zaid", "year_round"]] = None
    soil_type: Optional[Literal["clay", "sandy", "loamy", "black", "red", "alluvial", "laterite"]] = None
    # Farm-fit inputs: optional. When omitted the plain model output is returned.
    water_availability: Optional[Literal["low", "medium", "high"]] = None
    farming_experience: Optional[Literal["beginner", "intermediate", "experienced"]] = None
    market_preference: Optional[Literal["food", "cash", "mixed"]] = None
    area_ha: Optional[float] = Field(default=None, gt=0, le=10000)


def _fmt(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def _checks(crop: str, body: CropInput, ranges: dict) -> list:
    checks = []
    for feat, (lo, hi) in ranges.items():
        value, unit, label = getattr(body, feat), UNITS.get(feat, ""), LABELS[feat]
        span = f"{_fmt(lo)}-{_fmt(hi)}{unit}"
        if value < lo:
            checks.append({"status": "warn", "text": f"{label} is below the typical range ({span})"})
        elif value > hi:
            checks.append({"status": "warn", "text": f"{label} is above the typical range ({span})"})
        else:
            checks.append({"status": "ok", "text": f"{label} within typical range ({span})"})

    info = CROP_INFO.get(crop)
    if info and body.season and body.season != "year_round":
        if body.season in info["seasons"] or "year_round" in info["seasons"]:
            checks.append({"status": "ok", "text": f"Suitable for {body.season} season"})
        else:
            checks.append({"status": "warn", "text": f"Usually grown in {', '.join(info['seasons'])}, not {body.season}"})
    if info and body.soil_type:
        soil = SOIL_LABELS[body.soil_type]
        if body.soil_type in info["soils"]:
            checks.append({"status": "ok", "text": f"Suitable for {soil} soil"})
        else:
            checks.append({"status": "warn", "text": f"{soil.capitalize()} soil is not ideal for this crop"})
    return checks


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": "bundle" in state}


@app.post("/predict")
def predict(body: CropInput):
    bundle = state.get("bundle")
    if bundle is None:
        raise HTTPException(status_code=503, detail="Model not trained yet. Run `python train.py` in ai-service.")

    features = bundle["features"]
    row = pd.DataFrame([[getattr(body, f) for f in features]], columns=features)
    probs = bundle["model"].predict_proba(row)[0]
    classes = bundle["model"].classes_

    # Farm-fit: re-weight the model's probabilities with the documented rules in farm_fit.py
    fit_applied = any(
        v is not None for v in (body.water_availability, body.farming_experience, body.market_preference, body.area_ha)
    )
    fits = {}
    for c in classes:
        crop_key = str(c)
        fits[crop_key] = farm_fit.assess(
            crop_key, CROP_INFO.get(crop_key, {}),
            body.water_availability, body.farming_experience, body.market_preference, body.area_ha,
        )
    scores = [float(p) * fits[str(c)][0] for p, c in zip(probs, classes)]

    order = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:5]
    recommendations = []
    for idx in order:
        score = scores[idx]
        if score < 0.01 and recommendations:
            break
        crop = str(classes[idx])
        info = CROP_INFO.get(crop, {})
        factor, fit_notes = fits[crop]
        raw = float(probs[idx])
        level = "high" if score >= 0.6 else "medium" if score >= 0.25 else "low"

        checks = _checks(crop, body, bundle["crop_ranges"][crop])
        if fit_applied:
            if abs(factor - 1.0) > 1e-9:
                checks.append({
                    "status": "warn",
                    "text": f"Model confidence {raw * 100:.1f}% x farm fit {factor:.2f} = {score * 100:.1f}%",
                })
            checks.extend(fit_notes)

        recommendations.append({
            "crop": crop,
            "name": info.get("name", crop.title()),
            "confidence": round(score * 100, 1),
            "model_confidence": round(raw * 100, 1),
            "fit_factor": round(factor, 2),
            "level": level,
            "recommendation": {"high": "Highly Recommended", "medium": "Recommended", "low": "Possible Option"}[level],
            "duration": info.get("duration"),
            "water_need": info.get("water"),
            "market_type": farm_fit.market_type(crop),
            "seasons": info.get("seasons", []),
            "checks": checks,
        })

    warnings = []
    for feat, (lo, hi) in bundle["bounds"].items():
        value = getattr(body, feat)
        if value < lo or value > hi:
            warnings.append(
                f"{LABELS[feat]} ({_fmt(value)}) is outside the range the model was trained on "
                f"({_fmt(lo)}-{_fmt(hi)}); treat results with caution."
            )

    return {
        "recommendations": recommendations,
        "warnings": warnings,
        "fit_applied": fit_applied,
        "model": {"accuracy": round(bundle["accuracy"] * 100, 1), "rows": bundle["rows"]},
    }
