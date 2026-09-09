from typing import Optional
from fastapi import APIRouter, Query
from app.core.queue_engine import queue_engine
from app.routes.tokens import TOKENS_DB

router = APIRouter(prefix="/queue", tags=["Queue Prediction & Traffic Optimization"])

@router.get("/predict", summary="Calculate waiting time prediction based on Queue Theory")
async def predict_queue(
    center_id: str = Query(..., description="Target Mandi Procurement Center ID"),
    vehicle_type: str = Query("Tractor-Trolley", description="Farmer vehicle type"),
    active_weighbridges: int = Query(2, description="Number of functional weighbridge scales")
):
    # Count how many vehicles currently waiting in yard for this center
    yard_count = sum(
        1 for t in TOKENS_DB 
        if t.get("center_id") == center_id and t.get("status") in ["CHECKED_IN", "WAITING_IN_YARD", "AT_WEIGHBRIDGE"]
    )
    
    prediction = queue_engine.calculate_wait_time(
        active_weighbridges=active_weighbridges,
        vehicles_in_yard=yard_count,
        vehicle_type=vehicle_type
    )
    
    return {
        "center_id": center_id,
        "vehicle_type": vehicle_type,
        "yard_count": yard_count,
        "prediction": prediction
    }
