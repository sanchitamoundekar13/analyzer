from fastapi import APIRouter
from app.core.telemetry import telemetry_manager

router = APIRouter(prefix="/telemetry", tags=["Enterprise Infrastructure & Telemetry"])

@router.get("/live", summary="Get real-time cluster health, DB replication, and load balancer metrics")
async def get_live_telemetry():
    return telemetry_manager.get_live_metrics()

@router.get("/health", summary="Shallow load-balancer health probe")
async def health_check():
    return {
        "status": "UP",
        "service": "KisanSetu-Enterprise-Core",
        "gateway_sync": "OK",
        "timestamp": "2026-08-23T01:30:00Z"
    }
