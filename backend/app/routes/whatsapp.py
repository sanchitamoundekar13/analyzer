import logging
import httpx
from fastapi import APIRouter, HTTPException, Query, Response, status
from app.config import settings
from app.schemas.schemas import WhatsAppMessageRequest

router = APIRouter(prefix="/whatsapp", tags=["WhatsApp Meta API Integration"])
logger = logging.getLogger("kisansetu.whatsapp")

# Vernacular template generators for KisanSetu
def generate_whatsapp_text(req: WhatsAppMessageRequest) -> str:
    if req.language == "hi":
        if req.event_type == "SLOT_CONFIRMED":
            return (
                f"🌾 *किसान सेतु (KisanSetu) - ई-खरीद गेट पास*\n\n"
                f"नमस्ते *{req.farmer_name}* जी,\n"
                f"आपका एमएसपी खरीद स्लॉट टोकन सफलतापूर्वक बुक हो गया है।\n\n"
                f"📋 *टोकन नंबर:* `{req.token_number}`\n"
                f"🏛 *खरीद केंद्र:* {req.center_name}\n"
                f"📅 *दिनांक:* {req.slot_date}\n"
                f"⏰ *समय स्लॉट:* {req.slot_window}\n"
                f"🌾 *फसल:* {req.commodity}\n\n"
                f"⚠ *जरूरी निर्देश:*\n"
                f"1. कृपया अपने समय से 15 मिनट पहले केंद्र पर पहुंचें।\n"
                f"2. अनाज में नमी 17% या उससे कम होनी चाहिए।\n"
                f"3. गेट पर यह डिजिटल पास या क्यूआर कोड अवश्य दिखाएं।\n\n"
                f"जय जवान, जय किसान! 🇮🇳\n"
                f"हेल्पलाइन: 1800-180-1551"
            )
        elif req.event_type == "CHECKIN_ALERT":
            return (
                f"🚚 *किसान सेतु - गेट प्रवेश एवं यार्ड अपडेट*\n\n"
                f"नमस्ते *{req.farmer_name}* जी,\n"
                f"आपकी गाड़ी मंडी परिसर में प्रवेश कर चुकी है।\n"
                f"📋 *टोकन:* `{req.token_number}`\n"
                f"वर्तमान यार्ड स्थिति: *कतार में (Waiting in Yard)*\n"
                f"जैसे ही वे-ब्रिज पर आपका नंबर आएगा, आपको स्क्रीन पर बुलाया जाएगा।"
            )
        elif req.event_type == "WEIGHMENT_RECEIPT":
            return (
                f"✅ *किसान सेतु - सफल खरीद पावती रसीद*\n\n"
                f"नमस्ते *{req.farmer_name}* जी,\n"
                f"आपकी फसल की तुलाई सफलतापूर्वक पूरी हो चुकी है।\n\n"
                f"📋 *टोकन:* `{req.token_number}`\n"
                f"⚖ *शुद्ध वजन (Net Weight):* {req.net_weight or 0:.2f} क्विंटल\n"
                f"💰 *कुल एमएसपी भुगतान:* ₹{req.total_payout or 0:,.2f}\n\n"
                f"भुगतान राशि सीधे आपके आधार से जुड़े बैंक खाते में 48 घंटे में डीबीटी (DBT) द्वारा अंतरित कर दी जाएगी।"
            )
    else: # English
        if req.event_type == "SLOT_CONFIRMED":
            return (
                f"🌾 *KisanSetu - National MSP E-Procurement Pass*\n\n"
                f"Dear *{req.farmer_name}*,\n"
                f"Your MSP procurement slot has been successfully confirmed.\n\n"
                f"📋 *Token ID:* `{req.token_number}`\n"
                f"🏛 *Center:* {req.center_name}\n"
                f"📅 *Date:* {req.slot_date}\n"
                f"⏰ *Slot Window:* {req.slot_window}\n"
                f"🌾 *Commodity:* {req.commodity}\n\n"
                f"📌 *Instructions:*\n"
                f"1. Please arrive 15 minutes before your allotted window.\n"
                f"2. Ensure grain moisture is <= 17%.\n"
                f"3. Present the QR code on your pass at the entry gate.\n\n"
                f"Toll-free Helpline: 1800-180-1551"
            )
        elif req.event_type == "WEIGHMENT_RECEIPT":
            return (
                f"✅ *KisanSetu - Procurement Settlement Receipt*\n\n"
                f"Dear *{req.farmer_name}*,\n"
                f"Weighment completed for Token `{req.token_number}`.\n"
                f"⚖ *Net Weight:* {req.net_weight or 0:.2f} Quintals\n"
                f"💰 *Total MSP Payable:* ₹{req.total_payout or 0:,.2f}\n"
                f"Funds will be credited via DBT directly to your linked bank account."
            )

    return f"KisanSetu Token: {req.token_number} confirmed for {req.farmer_name}."

@router.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    """Meta WhatsApp Cloud API Webhook Verification Endpoint"""
    if hub_mode == "subscribe" and hub_verify_token == settings.WHATSAPP_WEBHOOK_VERIFY_TOKEN:
        return Response(content=hub_challenge, media_type="text/plain")
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid verification token")

@router.post("/webhook")
async def receive_webhook(payload: dict):
    """Meta WhatsApp Inbound Webhook Listener (Status updates and replies)"""
    logger.info("Received WhatsApp Webhook Payload: %s", payload)
    return {"status": "success", "received": True}

@router.post("/send-message")
async def send_whatsapp_message(req: WhatsAppMessageRequest):
    """
    Dispatches automated WhatsApp notification using Meta Cloud API.
    If live credentials are set, calls Meta Graph API; otherwise provides instant mock confirmation with direct WhatsApp Web link.
    """
    message_text = generate_whatsapp_text(req)
    clean_mobile = "".join([c for c in req.recipient_mobile if c.isdigit()])
    if len(clean_mobile) == 10:
        clean_mobile = "91" + clean_mobile
    
    # Meta Graph API Endpoint
    meta_url = f"https://graph.facebook.com/v19.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
    meta_payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": clean_mobile,
        "type": "text",
        "text": {"preview_url": False, "body": message_text}
    }

    meta_response_data = None
    is_live_call = False

    if settings.WHATSAPP_TOKEN and settings.WHATSAPP_TOKEN != "MOCK_TOKEN":
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(
                    meta_url,
                    json=meta_payload,
                    headers={
                        "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
                        "Content-Type": "application/json"
                    }
                )
                if resp.status_code == 200:
                    meta_response_data = resp.json()
                    is_live_call = True
                else:
                    logger.warning("Meta API returned status %s: %s", resp.status_code, resp.text)
        except Exception as e:
            logger.error("Error connecting to Meta Graph API: %s", str(e))

    # Click-to-chat fallback / demo URL
    encoded_text = httpx.URL("", params={"text": message_text}).query.decode("utf-8")
    direct_chat_url = f"https://wa.me/{clean_mobile}?{encoded_text}"

    return {
        "status": "SENT",
        "channel": "WhatsApp (Meta Cloud API)",
        "recipient": clean_mobile,
        "token_number": req.token_number,
        "event_type": req.event_type,
        "is_live_meta_delivery": is_live_call,
        "meta_message_id": (meta_response_data.get("messages", [{}])[0].get("id") if meta_response_data else f"wamid.mock.{clean_mobile}.{req.token_number}"),
        "message_preview": message_text,
        "direct_wa_link": direct_chat_url
    }
