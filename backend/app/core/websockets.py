import json
import logging
from typing import Dict, List, Set
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger("kisansetu.websockets")

class ConnectionManager:
    """
    Pub/Sub WebSocket manager for broadcasting real-time Mandi Yard queues,
    Gate Kiosk scan updates, and Weighbridge transitions without polling lag.
    """
    def __init__(self):
        # Map center_id -> Set of active WebSocket connections
        self.active_rooms: Dict[str, Set[WebSocket]] = {}
        # Global admin broadcast connections
        self.admin_connections: Set[WebSocket] = set()

    async def connect(self, websocket: WebSocket, center_id: str = "global"):
        await websocket.accept()
        if center_id == "global" or center_id == "admin":
            self.admin_connections.add(websocket)
        else:
            if center_id not in self.active_rooms:
                self.active_rooms[center_id] = set()
            self.active_rooms[center_id].add(websocket)
        logger.info(f"WebSocket client connected to room [{center_id}]. Total rooms: {len(self.active_rooms)}")

    def disconnect(self, websocket: WebSocket, center_id: str = "global"):
        if websocket in self.admin_connections:
            self.admin_connections.remove(websocket)
        if center_id in self.active_rooms and websocket in self.active_rooms[center_id]:
            self.active_rooms[center_id].remove(websocket)
            if not self.active_rooms[center_id]:
                del self.active_rooms[center_id]
        logger.info(f"WebSocket client disconnected from room [{center_id}]")

    async def broadcast_to_center(self, center_id: str, message: dict):
        payload = json.dumps(message)
        dead_connections = []
        
        # Broadcast to specific Mandi room
        if center_id in self.active_rooms:
            for ws in self.active_rooms[center_id]:
                try:
                    await ws.send_text(payload)
                except Exception:
                    dead_connections.append(ws)
            for dead_ws in dead_connections:
                self.disconnect(dead_ws, center_id)

        # Also broadcast to global admin observers
        dead_admin = []
        for ws in self.admin_connections:
            try:
                await ws.send_text(payload)
            except Exception:
                dead_admin.append(ws)
        for dead_ws in dead_admin:
            self.disconnect(dead_ws, "admin")

    async def broadcast_global(self, message: dict):
        payload = json.dumps(message)
        for center_id in list(self.active_rooms.keys()):
            for ws in list(self.active_rooms.get(center_id, [])):
                try:
                    await ws.send_text(payload)
                except Exception:
                    pass
        for ws in list(self.admin_connections):
            try:
                await ws.send_text(payload)
            except Exception:
                pass

ws_manager = ConnectionManager()
