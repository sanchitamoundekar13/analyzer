"""
Authentication schemas for ResumeLens.
"""

from typing import Optional
from pydantic import BaseModel
from .user import UserResponse

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserResponse] = None

class RefreshTokenRequest(BaseModel):
    refresh_token: str
