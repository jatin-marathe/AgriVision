from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

import disease_model

router = APIRouter(prefix="/disease", tags=["disease"])


class DiseaseInput(BaseModel):
    crop: str = Field(min_length=1, max_length=40)
    rainfall: float = Field(ge=0, le=1000)
    temperature: float = Field(ge=-5, le=50)
    humidity: float = Field(ge=0, le=100)
    pesticide_days: Literal["0_7", "8_14", "15_30", "30_plus"]
    season: Literal["summer", "monsoon", "post_monsoon", "winter"]


@router.get("/crops")
def crops():
    return {"crops": disease_model.list_crops()}


@router.post("/assess")
def assess(body: DiseaseInput):
    if body.crop not in disease_model.CROPS:
        raise HTTPException(status_code=422, detail="Unknown crop")
    return disease_model.assess(
        body.crop, body.rainfall, body.temperature, body.humidity, body.pesticide_days, body.season
    )
