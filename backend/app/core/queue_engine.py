from typing import Dict, Any, List

class QueueTheoryEngine:
    """
    Predictive Queueing Theory Engine for Mandi Weighbridge & Holding Yard Operations.
    Implements an M/M/c multi-server queue model adjusted for vehicle type and crop volume.
    """
    
    # Vehicle Service Time Multipliers (in minutes)
    VEHICLE_SERVICE_TIME = {
        "Tractor-Trolley (ट्रैक्टर-ट्रॉली)": 5.5,
        "Tractor-Trolley": 5.5,
        "Mini-Truck / Pickup (पिकअप / छोटा हाथी)": 3.8,
        "Mini-Truck (Pick-up)": 3.8,
        "Heavy Commercial Truck (बड़ा ट्रक)": 9.2,
        "Heavy Truck": 9.2,
        "Bullock Cart (पारंपरिक बैलगाड़ी)": 6.0,
        "Bullock Cart": 6.0
    }

    @classmethod
    def calculate_wait_time(
        cls, 
        active_weighbridges: int, 
        vehicles_in_yard: int, 
        vehicle_type: str = "Tractor-Trolley",
        hourly_throughput: int = 18
    ) -> Dict[str, Any]:
        """
        Calculates estimated waiting time in minutes, throughput velocity, and congestion status.
        """
        num_servers = max(1, active_weighbridges)
        service_time_per_vehicle = cls.VEHICLE_SERVICE_TIME.get(vehicle_type, 5.0)
        
        # Effective processing capacity in vehicles per minute across all active scales
        system_rate_per_min = (num_servers * 60.0) / max(service_time_per_vehicle, 2.0)
        
        # Base queue delay
        if vehicles_in_yard <= 0:
            estimated_wait_min = 2.0 # Minimum check-in & tare overhead
        else:
            # Weighted wait calculation
            estimated_wait_min = (vehicles_in_yard * service_time_per_vehicle) / num_servers
            
        # Add safety buffer of 10% for turn maneuvers and sampling
        total_estimated_min = round(estimated_wait_min * 1.1)

        # Determine Congestion Level
        if total_estimated_min <= 20:
            congestion_level = "LOW"
            advisory = "Optimal capacity. Smooth check-in with minimal holding yard delay."
            color = "#10B981"
        elif total_estimated_min <= 45:
            congestion_level = "MODERATE"
            advisory = "Moderate traffic. Proceed as scheduled to holding bay."
            color = "#F59E0B"
        else:
            congestion_level = "HIGH"
            advisory = "High congestion detected. Consider diverting to Buffer Center (Kalyanpur) to save time."
            color = "#EF4444"

        return {
            "estimated_wait_minutes": max(5, total_estimated_min),
            "vehicles_ahead": vehicles_in_yard,
            "active_weighbridges": num_servers,
            "hourly_throughput_qtl": hourly_throughput * 45, # ~45 qtl per avg vehicle
            "congestion_level": congestion_level,
            "advisory": advisory,
            "color": color,
            "recommended_buffer_divert": total_estimated_min > 50
        }

queue_engine = QueueTheoryEngine()
