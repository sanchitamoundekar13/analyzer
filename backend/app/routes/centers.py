from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/centers", tags=["Procurement Centers & Slot Capacities"])

SAMPLE_CENTERS = [
    {
        "id": "11111111-1111-1111-1111-111111111111",
        "code": "PPC-RAMPUR-01",
        "name": "Rampur Main Krishi Mandi PPC",
        "state": "Uttar Pradesh",
        "district": "Rampur",
        "taluka_block": "Rampur Sadar",
        "max_daily_capacity_qtl": 3000.0,
        "current_booked_qtl": 2550.0,
        "capacity_percentage": 85,
        "status_tag": "High Traffic",
        "hourly_throughput_rate": 18,
        "active_weighbridges": 2,
        "total_weighbridges": 2,
        "contact_phone": "+91 595 2341001",
        "slots": [
            {"id": "s1", "time_window": "08:00 AM - 10:00 AM", "total_capacity": 20, "booked": 20, "available": 0, "status": "FULL"},
            {"id": "s2", "time_window": "10:00 AM - 12:00 PM", "total_capacity": 20, "booked": 18, "available": 2, "status": "LIMITED"},
            {"id": "s3", "time_window": "12:00 PM - 02:00 PM", "total_capacity": 20, "booked": 16, "available": 4, "status": "AVAILABLE"},
            {"id": "s4", "time_window": "02:00 PM - 04:00 PM", "total_capacity": 20, "booked": 8, "available": 12, "status": "AVAILABLE"},
            {"id": "s5", "time_window": "04:00 PM - 06:00 PM", "total_capacity": 20, "booked": 5, "available": 15, "status": "AVAILABLE"}
        ]
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "code": "PPC-BILASPUR-02",
        "name": "Bilaspur Anaj Mandi PPC",
        "state": "Uttar Pradesh",
        "district": "Rampur",
        "taluka_block": "Bilaspur",
        "max_daily_capacity_qtl": 2500.0,
        "current_booked_qtl": 625.0,
        "capacity_percentage": 25,
        "status_tag": "Optimal Availability",
        "hourly_throughput_rate": 15,
        "active_weighbridges": 2,
        "total_weighbridges": 2,
        "contact_phone": "+91 595 2341002",
        "slots": [
            {"id": "b1", "time_window": "08:00 AM - 10:00 AM", "total_capacity": 20, "booked": 6, "available": 14, "status": "AVAILABLE"},
            {"id": "b2", "time_window": "10:00 AM - 12:00 PM", "total_capacity": 20, "booked": 8, "available": 12, "status": "AVAILABLE"},
            {"id": "b3", "time_window": "12:00 PM - 02:00 PM", "total_capacity": 20, "booked": 5, "available": 15, "status": "AVAILABLE"},
            {"id": "b4", "time_window": "02:00 PM - 04:00 PM", "total_capacity": 20, "booked": 4, "available": 16, "status": "AVAILABLE"},
            {"id": "b5", "time_window": "04:00 PM - 06:00 PM", "total_capacity": 20, "booked": 2, "available": 18, "status": "AVAILABLE"}
        ]
    },
    {
        "id": "33333333-3333-3333-3333-333333333333",
        "code": "PPC-KALYANPUR-03",
        "name": "Kalyanpur Greenfield PPC (Buffer Center)",
        "state": "Uttar Pradesh",
        "district": "Rampur",
        "taluka_block": "Milak",
        "max_daily_capacity_qtl": 2000.0,
        "current_booked_qtl": 300.0,
        "capacity_percentage": 15,
        "status_tag": "Zero Wait Time",
        "hourly_throughput_rate": 12,
        "active_weighbridges": 2,
        "total_weighbridges": 2,
        "contact_phone": "+91 595 2341003",
        "slots": [
            {"id": "k1", "time_window": "08:00 AM - 10:00 AM", "total_capacity": 20, "booked": 2, "available": 18, "status": "AVAILABLE"},
            {"id": "k2", "time_window": "10:00 AM - 12:00 PM", "total_capacity": 20, "booked": 3, "available": 17, "status": "AVAILABLE"},
            {"id": "k3", "time_window": "12:00 PM - 02:00 PM", "total_capacity": 20, "booked": 2, "available": 18, "status": "AVAILABLE"},
            {"id": "k4", "time_window": "02:00 PM - 04:00 PM", "total_capacity": 20, "booked": 1, "available": 19, "status": "AVAILABLE"},
            {"id": "k5", "time_window": "04:00 PM - 06:00 PM", "total_capacity": 20, "booked": 1, "available": 19, "status": "AVAILABLE"}
        ]
    }
]

@router.get("")
async def get_all_centers():
    """Retrieve all procurement centers with live slot and capacity stats"""
    return {"status": "success", "centers": SAMPLE_CENTERS}

@router.get("/{center_id}")
async def get_center_by_id(center_id: str):
    """Retrieve specific procurement center by ID or Code"""
    for c in SAMPLE_CENTERS:
        if c["id"] == center_id or c["code"] == center_id:
            return {"status": "success", "center": c}
    return {"status": "error", "message": "Center not found"}
