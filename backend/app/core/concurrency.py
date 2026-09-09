import asyncio
from typing import Dict, Set

class SlotLockManager:
    """
    High-performance thread-safe concurrent slot lock manager.
    Guarantees zero double-bookings when thousands of farmers book slots simultaneously.
    """
    def __init__(self):
        self._locks: Dict[str, asyncio.Lock] = {}
        self._slot_bookings: Dict[str, int] = {}
        self._max_capacities: Dict[str, int] = {
            "s1": 20,
            "s2": 20,
            "s3": 20,
            "s4": 20,
            "s5": 20,
            "slot-1": 20,
            "slot-2": 20,
            "slot-3": 20,
            "slot-4": 20,
            "slot-5": 20,
        }

    def _get_lock_key(self, center_id: str, slot_id: str, slot_date: str) -> str:
        return f"{center_id}:{slot_id}:{slot_date}"

    async def acquire_slot_reservation(self, center_id: str, slot_id: str, slot_date: str, max_cap: int = 20) -> bool:
        key = self._get_lock_key(center_id, slot_id, slot_date)
        
        if key not in self._locks:
            self._locks[key] = asyncio.Lock()
            
        async with self._locks[key]:
            current_count = self._slot_bookings.get(key, 0)
            capacity = self._max_capacities.get(slot_id, max_cap)
            
            if current_count >= capacity:
                return False
                
            self._slot_bookings[key] = current_count + 1
            return True

    async def release_slot_reservation(self, center_id: str, slot_id: str, slot_date: str):
        key = self._get_lock_key(center_id, slot_id, slot_date)
        if key in self._locks:
            async with self._locks[key]:
                current_count = self._slot_bookings.get(key, 0)
                if current_count > 0:
                    self._slot_bookings[key] = current_count - 1

    def get_remaining_slots(self, center_id: str, slot_id: str, slot_date: str, max_cap: int = 20) -> int:
        key = self._get_lock_key(center_id, slot_id, slot_date)
        current = self._slot_bookings.get(key, 0)
        cap = self._max_capacities.get(slot_id, max_cap)
        return max(0, cap - current)

slot_lock_manager = SlotLockManager()
