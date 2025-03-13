from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import numpy as np

from typing import List, Dict
from . import themath

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    x: List[float]
    y: List[float]


@app.post("/data")
async def root(data: Item) -> Dict:
    m, a, freqs = themath.dft(data.x, data.y)
    return {"magn": m.tolist(), "angles": a.tolist(), "freqs": freqs.tolist()}
