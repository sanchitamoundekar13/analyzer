import random
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status
from app.core.concurrency import slot_lock_manager
from app.core.websockets import ws_manager
from app.schemas.schemas import (
    FarmerBookingRequest,
    QCCheckRequest,
    WeighmentRequest,
    StatusUpdateRequest,
    TokenResponse
)

router = APIRouter(prefix="/tokens", tags=["Token Management & Mandi Workflow"])

# In-memory realistic store initialized with demo data
TOKENS_DB = [
    {
        "id": "t-1001",
        "token_number": "KS-2026-RAM-1001",
        "farmer_name": "Ramesh Chandra Verma",
        "farmer_mobile": "+91 98765 43210",
        "kisan_reg_id": "UP-RAM-2024-88912",
        "village": "Dhamora",
        "district": "Rampur",
        "state": "Uttar Pradesh",
        "center_id": "11111111-1111-1111-1111-111111111111",
        "center_name": "Rampur Main Krishi Mandi PPC",
        "slot_id": "s1",
        "slot_window": "08:00 AM - 10:00 AM",
        "slot_date": "2026-08-23",
        "commodity": "Paddy (Grade A)",
        "msp_rate": 2320.0,
        "estimated_quantity_qtl": 65.0,
        "vehicle_type": "Tractor-Trolley",
        "vehicle_registration": "UP 22 AB 4591",
        "status": "COMPLETED",
        "moisture_percentage": 14.8,
        "qc_result": "PASSED",
        "gross_weight_qtl": 115.40,
        "tare_weight_qtl": 50.20,
        "net_weight_qtl": 65.20,
        "total_msp_payout": 151264.0,
        "created_at": "2026-08-23T07:30:00Z"
    },
    {
        "id": "t-1002",
        "token_number": "KS-2026-RAM-1002",
        "farmer_name": "Sardar Gurpreet Singh",
        "farmer_mobile": "+91 94120 56789",
        "kisan_reg_id": "UP-RAM-2024-91204",
        "village": "Milak Khanam",
        "district": "Rampur",
        "state": "Uttar Pradesh",
        "center_id": "11111111-1111-1111-1111-111111111111",
        "center_name": "Rampur Main Krishi Mandi PPC",
        "slot_id": "s1",
        "slot_window": "08:00 AM - 10:00 AM",
        "slot_date": "2026-08-23",
        "commodity": "Paddy (Common)",
        "msp_rate": 2300.0,
        "estimated_quantity_qtl": 80.0,
        "vehicle_type": "Tractor-Trolley",
        "vehicle_registration": "UP 22 X 7821",
        "status": "AT_WEIGHBRIDGE",
        "moisture_percentage": 15.6,
        "qc_result": "PASSED",
        "gross_weight_qtl": 142.00,
        "tare_weight_qtl": 52.00,
        "net_weight_qtl": 90.00,
        "total_msp_payout": 207000.0,
        "created_at": "2026-08-23T08:15:00Z"
    },
    {
        "id": "t-1003",
        "token_number": "KS-2026-RAM-1003",
        "farmer_name": "Harish Kumar Saini",
        "farmer_mobile": "+91 98371 11223",
        "kisan_reg_id": "UP-RAM-2024-77419",
        "village": "Saidnagar",
        "district": "Rampur",
        "state": "Uttar Pradesh",
        "center_id": "11111111-1111-1111-1111-111111111111",
        "center_name": "Rampur Main Krishi Mandi PPC",
        "slot_id": "s2",
        "slot_window": "10:00 AM - 12:00 PM",
        "slot_date": "2026-08-23",
        "commodity": "Mustard (Standard)",
        "msp_rate": 5650.0,
        "estimated_quantity_qtl": 35.0,
        "vehicle_type": "Mini-Truck (Pick-up)",
        "vehicle_registration": "UP 22 T 3319",
        "status": "WAITING_IN_YARD",
        "moisture_percentage": 8.2,
        "qc_result": "PASSED",
        "gross_weight_qtl": None,
        "tare_weight_qtl": None,
        "net_weight_qtl": None,
        "total_msp_payout": None,
        "created_at": "2026-08-23T09:00:00Z"
    },
    {
        "id": "t-1004",
        "token_number": "KS-2026-RAM-1004",
        "farmer_name": "Baldev Yadav",
        "farmer_mobile": "+91 97590 99881",
        "kisan_reg_id": "UP-RAM-2024-65102",
        "village": "Chamraua",
        "district": "Rampur",
        "state": "Uttar Pradesh",
        "center_id": "11111111-1111-1111-1111-111111111111",
        "center_name": "Rampur Main Krishi Mandi PPC",
        "slot_id": "s2",
        "slot_window": "10:00 AM - 12:00 PM",
        "slot_date": "2026-08-23",
        "commodity": "Paddy (Common)",
        "msp_rate": 2300.0,
        "estimated_quantity_qtl": 50.0,
        "vehicle_type": "Tractor-Trolley",
        "vehicle_registration": "UP 22 K 6140",
        "status": "WAITING_IN_YARD",
        "moisture_percentage": 16.4,
        "qc_result": "PASSED",
        "gross_weight_qtl": None,
        "tare_weight_qtl": None,
        "net_weight_qtl": None,
        "total_msp_payout": None,
        "created_at": "2026-08-23T09:30:00Z"
    },
    {
        "id": "t-1005",
        "token_number": "KS-2026-RAM-1005",
        "farmer_name": "Rajendra Prasad Sharma",
        "farmer_mobile": "+91 96340 77120",
        "kisan_reg_id": "UP-RAM-2024-44391",
        "village": "Bhot",
        "district": "Rampur",
        "state": "Uttar Pradesh",
        "center_id": "11111111-1111-1111-1111-111111111111",
        "center_name": "Rampur Main Krishi Mandi PPC",
        "slot_id": "s3",
        "slot_window": "12:00 PM - 02:00 PM",
        "slot_date": "2026-08-23",
        "commodity": "Wheat (Sharbati)",
        "msp_rate": 2425.0,
        "estimated_quantity_qtl": 45.0,
        "vehicle_type": "Tractor-Trolley",
        "vehicle_registration": "UP 22 M 9087",
        "status": "BOOKED",
        "moisture_percentage": None,
        "qc_result": "PENDING",
        "gross_weight_qtl": None,
        "tare_weight_qtl": None,
        "net_weight_qtl": None,
        "total_msp_payout": None,
        "created_at": "2026-08-23T10:00:00Z"
    }
]

@router.get("", response_model=List[TokenResponse])
async def get_all_tokens(center_id: Optional[str] = None, status: Optional[str] = None):
    """Retrieve all tokens with optional filtering"""
    results = TOKENS_DB
    if center_id:
        results = [t for t in results if t["center_id"] == center_id]
    if status and status != "ALL":
        results = [t for t in results if t["status"] == status]
    return results

@router.get("/{token_identifier}")
async def get_token_by_id_or_number(token_identifier: str):
    """Look up token by ID, Token Number, or Farmer Mobile"""
    clean_query = token_identifier.strip().lower()
    for t in TOKENS_DB:
        if (t["token_number"].lower() == clean_query or 
            t["id"].lower() == clean_query or 
            clean_query in t["farmer_mobile"].replace(" ", "").replace("+91", "")):
            return {"status": "success", "token": t}
    raise HTTPException(status_code=404, detail=f"Token '{token_identifier}' not found in National Registry")

@router.post("/book", response_model=TokenResponse)
async def book_token(req: FarmerBookingRequest):
    """
    Book a new procurement token with atomic race-condition concurrency lock.
    """
    # Atomically acquire slot reservation
    acquired = await slot_lock_manager.acquire_slot_reservation(
        center_id=req.center_id,
        slot_id=req.slot_id,
        slot_date=req.slot_date,
        max_cap=20
    )
    if not acquired:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Slot '{req.slot_window}' for center '{req.center_name}' is fully booked. Please select another slot or buffer center."
        )

    random_id_suffix = random.randint(1006, 9999)
    prefix_map = {
        "11111111-1111-1111-1111-111111111111": "RAM",
        "22222222-2222-2222-2222-222222222222": "BIL",
        "33333333-3333-3333-3333-333333333333": "KAL"
    }
    prefix = prefix_map.get(req.center_id, "RAM")
    token_number = f"KS-2026-{prefix}-{random_id_suffix}"
    
    new_token = {
        "id": f"t-{random_id_suffix}",
        "token_number": token_number,
        "farmer_name": req.farmer_name,
        "farmer_mobile": req.farmer_mobile,
        "kisan_reg_id": req.kisan_reg_id,
        "village": req.village,
        "district": req.district,
        "state": req.state,
        "center_id": req.center_id,
        "center_name": req.center_name,
        "slot_id": req.slot_id,
        "slot_window": req.slot_window,
        "slot_date": req.slot_date,
        "commodity": req.commodity,
        "msp_rate": req.msp_rate,
        "estimated_quantity_qtl": req.estimated_quantity_qtl,
        "vehicle_type": req.vehicle_type,
        "vehicle_registration": req.vehicle_registration,
        "status": "BOOKED",
        "moisture_percentage": None,
        "qc_result": "PENDING",
        "gross_weight_qtl": None,
        "tare_weight_qtl": None,
        "net_weight_qtl": None,
        "total_msp_payout": None,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    
    TOKENS_DB.insert(0, new_token)

    # Broadcast real-time event to Mandi Display Screens & Gate Kiosks
    await ws_manager.broadcast_to_center(req.center_id, {
        "event": "TOKEN_BOOKED",
        "token_number": token_number,
        "farmer_name": req.farmer_name,
        "slot_window": req.slot_window,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    return new_token

@router.post("/qc-check")
async def update_qc_check(req: QCCheckRequest):
    """Update moisture reading and evaluate Agmark QC result"""
    for t in TOKENS_DB:
        if t["token_number"].lower() == req.token_number.lower():
            t["moisture_percentage"] = req.moisture_percentage
            if req.moisture_percentage <= 17.0:
                t["qc_result"] = "PASSED"
                if t["status"] == "BOOKED":
                    t["status"] = "WAITING_IN_YARD"
            else:
                t["qc_result"] = "HIGH_MOISTURE"
            
            # Broadcast event
            await ws_manager.broadcast_to_center(t["center_id"], {
                "event": "QC_UPDATED",
                "token_number": t["token_number"],
                "qc_result": t["qc_result"],
                "moisture": req.moisture_percentage
            })
            return {"status": "success", "token": t}
    raise HTTPException(status_code=404, detail="Token not found")

@router.post("/weighment")
async def record_weighment(req: WeighmentRequest):
    """Calculate net weight, total MSP payout, and complete procurement"""
    for t in TOKENS_DB:
        if t["token_number"].lower() == req.token_number.lower():
            net_weight = max(0.0, req.gross_weight_qtl - req.tare_weight_qtl)
            payout = round(net_weight * t["msp_rate"], 2)
            
            t["gross_weight_qtl"] = req.gross_weight_qtl
            t["tare_weight_qtl"] = req.tare_weight_qtl
            t["net_weight_qtl"] = round(net_weight, 2)
            t["total_msp_payout"] = payout
            t["status"] = "COMPLETED"

            # Broadcast weighment completion
            await ws_manager.broadcast_to_center(t["center_id"], {
                "event": "WEIGHMENT_COMPLETED",
                "token_number": t["token_number"],
                "net_weight_qtl": round(net_weight, 2),
                "total_payout": payout
            })

            return {"status": "success", "token": t}
    raise HTTPException(status_code=404, detail="Token not found")

@router.post("/status")
async def update_token_status(req: StatusUpdateRequest):
    """Transition token status (CHECKED_IN, WAITING_IN_YARD, AT_WEIGHBRIDGE, COMPLETED, CANCELLED)"""
    for t in TOKENS_DB:
        if t["token_number"].lower() == req.token_number.lower():
            t["status"] = req.status
            
            # Broadcast status transition
            await ws_manager.broadcast_to_center(t["center_id"], {
                "event": "STATUS_CHANGED",
                "token_number": t["token_number"],
                "new_status": req.status
            })
            return {"status": "success", "token": t}
    raise HTTPException(status_code=404, detail="Token not found")
