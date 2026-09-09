from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class FarmerBookingRequest(BaseModel):
    farmer_name: str
    farmer_mobile: str
    kisan_reg_id: str
    village: str
    district: str
    state: str = "Uttar Pradesh"
    center_id: str
    center_name: str
    slot_id: str
    slot_window: str
    slot_date: str
    commodity: str
    msp_rate: float
    estimated_quantity_qtl: float
    vehicle_type: str
    vehicle_registration: str
    language: str = "hi"

class TokenResponse(BaseModel):
    id: str
    token_number: str
    farmer_name: str
    farmer_mobile: str
    kisan_reg_id: str
    village: str
    center_id: str
    center_name: str
    slot_window: str
    slot_date: str
    commodity: str
    msp_rate: float
    estimated_quantity_qtl: float
    vehicle_type: str
    vehicle_registration: str
    status: str
    moisture_percentage: Optional[float] = None
    qc_result: Optional[str] = "PENDING"
    gross_weight_qtl: Optional[float] = None
    tare_weight_qtl: Optional[float] = None
    net_weight_qtl: Optional[float] = None
    total_msp_payout: Optional[float] = None
    created_at: str

class QCCheckRequest(BaseModel):
    token_number: str
    moisture_percentage: float
    inspector_name: Optional[str] = "Gate In-Charge"

class WeighmentRequest(BaseModel):
    token_number: str
    gross_weight_qtl: float
    tare_weight_qtl: float
    operator_name: Optional[str] = "Weighbridge In-Charge"

class StatusUpdateRequest(BaseModel):
    token_number: str
    status: str # 'CHECKED_IN', 'WAITING_IN_YARD', 'AT_WEIGHBRIDGE', 'COMPLETED', 'CANCELLED'

class WhatsAppMessageRequest(BaseModel):
    recipient_mobile: str
    farmer_name: str
    token_number: str
    center_name: str
    slot_window: str
    slot_date: str
    commodity: str
    event_type: str = "SLOT_CONFIRMED" # 'SLOT_CONFIRMED', 'CHECKIN_ALERT', 'WEIGHMENT_RECEIPT'
    net_weight: Optional[float] = None
    total_payout: Optional[float] = None
    language: str = "hi"
