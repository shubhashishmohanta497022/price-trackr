from typing import Any, Dict, Optional
from fastapi.responses import JSONResponse
from fastapi import status

class APIResponse:
    @staticmethod
    def success(data: Any = None, message: str = "Success", status_code: int = status.HTTP_200_OK) -> JSONResponse:
        """Standard success response"""
        response_data = {
            "success": True,
            "message": message,
            "data": data
        }
        return JSONResponse(content=response_data, status_code=status_code)

    @staticmethod
    def error(message: str = "An error occurred", data: Any = None, status_code: int = status.HTTP_400_BAD_REQUEST) -> JSONResponse:
        """Standard error response"""
        response_data = {
            "success": False,
            "message": message,
            "data": data
        }
        return JSONResponse(content=response_data, status_code=status_code)

    @staticmethod
    def not_found(message: str = "Resource not found") -> JSONResponse:
        """Standard 404 response"""
        return APIResponse.error(message=message, status_code=status.HTTP_404_NOT_FOUND)

    @staticmethod
    def unauthorized(message: str = "Unauthorized access") -> JSONResponse:
        """Standard 401 response"""
        return APIResponse.error(message=message, status_code=status.HTTP_401_UNAUTHORIZED)

    @staticmethod
    def forbidden(message: str = "Access forbidden") -> JSONResponse:
        """Standard 403 response"""
        return APIResponse.error(message=message, status_code=status.HTTP_403_FORBIDDEN)

    @staticmethod
    def validation_error(errors: Dict[str, Any]) -> JSONResponse:
        """Standard validation error response"""
        return APIResponse.error(
            message="Validation failed",
            data={"validation_errors": errors},
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
        )
