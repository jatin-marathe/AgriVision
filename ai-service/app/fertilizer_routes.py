from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

import fertilizer_model

router = APIRouter(prefix="/fertilizer", tags=["fertilizer"])


class FertilizerInput(BaseModel):
    crop: str = Field(min_length=1, max_length=40)
    rainfall: float = Field(ge=0, le=5000)
    soil_type: Literal["clay", "sandy", "loamy", "silt", "red", "black", "alluvial"]
    area_ha: float = Field(gt=0, le=10000)
    growth_stage: Literal["basal", "vegetative", "flowering", "maturity"]
    ph_class: Literal["unknown", "acidic", "slightly_acidic", "neutral", "alkaline"]


@router.get("/crops")
def crops():
    return {"crops": fertilizer_model.list_crops()}


@router.post("/recommend")
def recommend(body: FertilizerInput):
    if body.crop not in fertilizer_model.CROPS:
        raise HTTPException(status_code=422, detail="Unknown crop")
    return fertilizer_model.recommend(
        body.crop, body.rainfall, body.soil_type, body.area_ha, body.growth_stage, body.ph_class
    )
