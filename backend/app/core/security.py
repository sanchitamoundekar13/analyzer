import time
import uuid
import logging
from typing import Dict, Tuple
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse, Response

logger = logging.getLogger("kisansetu.security")

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Applies Government of India & OWASP-compliant security headers to every HTTP response.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(self), microphone=(), camera=()"
        response.headers["X-GovTech-Node"] = "NIC-UP-CLUSTER-01"
        return response

class RequestTrackingMiddleware(BaseHTTPMiddleware):
    """
    Tracks correlation IDs, execution latency, and client telemetry.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = request_id
        start_time = time.perf_counter()
        
        response = await call_next(request)
        
        duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Response-Time-Ms"] = str(duration_ms)
        
        return response

class InMemoryRateLimiter:
    """
    High-performance token-bucket rate limiter for DDoS and abuse prevention.
    """
    def __init__(self, requests_per_minute: int = 120):
        self.rpm = requests_per_minute
        self.clients: Dict[str, Tuple[float, int]] = {}

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        if client_ip not in self.clients:
            self.clients[client_ip] = (now, 1)
            return True
        
        first_time, count = self.clients[client_ip]
        if now - first_time > 60:
            self.clients[client_ip] = (now, 1)
            return True
        
        if count < self.rpm:
            self.clients[client_ip] = (first_time, count + 1)
            return True
        
        return False

rate_limiter = InMemoryRateLimiter(requests_per_minute=200)

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        client_ip = request.client.host if request.client else "127.0.0.1"
        
        # Exclude health check and metrics from rate limits
        if request.url.path in ["/health", "/", "/api/v1/telemetry/live"]:
            return await call_next(request)
            
        if not rate_limiter.is_allowed(client_ip):
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "error": "RATE_LIMIT_EXCEEDED",
                    "message": "Too many requests to KisanSetu National Gateway. Please try again in 1 minute.",
                    "code": 429
                },
                headers={"Retry-After": "60"}
            )
        
        return await call_next(request)
