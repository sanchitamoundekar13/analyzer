import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.websockets import ws_manager

logger = logging.getLogger("kisansetu.ws_routes")

router = APIRouter(tags=["Live WebSocket Broadcasting"])

@router.websocket("/ws/yard/{center_id}")
async def websocket_yard_endpoint(websocket: WebSocket, center_id: str):
    await ws_manager.connect(websocket, center_id)
    try:
        # Send initial handshake message
        await websocket.send_json({
            "event": "CONNECTED",
            "center_id": center_id,
            "message": f"Subscribed to real-time Mandi Yard Feed for [{center_id}]"
        })
        while True:
            # Keep-alive heartbeat listener
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, center_id)
    except Exception as e:
        logger.error(f"WebSocket error in room [{center_id}]: {e}")
        ws_manager.disconnect(websocket, center_id)
