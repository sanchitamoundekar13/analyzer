"""
File Validator Service for ResumeLens.
Validates file extensions, size limits, corruption, password protection, and readability.
"""

import io
from typing import Dict, Any, Optional

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc", ".txt"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB


def validate_uploaded_file(
    file_bytes: Optional[bytes],
    filename: Optional[str] = None
) -> Dict[str, Any]:
    """
    Validates uploaded file payload for security, format, corruption, and password locks.
    
    Returns:
        Dict with keys:
            - is_valid: bool
            - error_type: Optional[str] ('empty_file', 'unsupported_format', 'file_too_large', 'corrupted', 'password_protected')
            - message: str
            - detected_extension: str
            - file_size_bytes: int
    """
    if not file_bytes or len(file_bytes) == 0:
        return {
            "is_valid": False,
            "error_type": "empty_file",
            "message": "The uploaded file is empty. Please upload a valid Resume or CV file.",
            "detected_extension": "",
            "file_size_bytes": 0
        }

    file_size = len(file_bytes)
    if file_size > MAX_FILE_SIZE_BYTES:
        return {
            "is_valid": False,
            "error_type": "file_too_large",
            "message": f"File size exceeds the 10MB limit (uploaded: {file_size / (1024 * 1024):.1f}MB). Please upload a smaller file.",
            "detected_extension": "",
            "file_size_bytes": file_size
        }

    # Determine extension
    fname = (filename or "document.pdf").lower()
    ext = ""
    for candidate_ext in ALLOWED_EXTENSIONS:
        if fname.endswith(candidate_ext):
            ext = candidate_ext
            break

    # If filename has an explicit non-allowed extension (e.g., .zip, .exe, .png, .jpg), reject it
    if not ext:
        has_other_ext = any(fname.endswith(bad_ext) for bad_ext in [".zip", ".exe", ".rar", ".7z", ".tar", ".gz", ".png", ".jpg", ".jpeg", ".bmp", ".gif", ".csv", ".xlsx", ".json", ".xml", ".html", ".js", ".py"])
        if has_other_ext:
            return {
                "is_valid": False,
                "error_type": "unsupported_format",
                "message": "Unsupported file format. ResumeLens supports PDF (.pdf) and Word (.docx, .doc) resumes.",
                "detected_extension": fname.split(".")[-1] if "." in fname else "unknown",
                "file_size_bytes": file_size
            }
        # Check magic bytes for PDF/DOCX if extension is missing/generic
        if file_bytes.startswith(b"%PDF-"):
            ext = ".pdf"
        elif file_bytes.startswith(b"PK\x03\x04"):
            ext = ".docx"
        else:
            return {
                "is_valid": False,
                "error_type": "unsupported_format",
                "message": "Unsupported file format. ResumeLens supports PDF (.pdf) and Word (.docx, .doc) resumes.",
                "detected_extension": fname.split(".")[-1] if "." in fname else "unknown",
                "file_size_bytes": file_size
            }

    # Deep format integrity & password check for PDF
    if ext == ".pdf":
        try:
            import fitz  # PyMuPDF
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            if doc.is_encrypted or doc.needs_pass:
                doc.close()
                return {
                    "is_valid": False,
                    "error_type": "password_protected",
                    "message": "This document is password-protected. Please upload an unlocked version of your resume.",
                    "detected_extension": ext,
                    "file_size_bytes": file_size
                }
            if len(doc) == 0:
                doc.close()
                return {
                    "is_valid": False,
                    "error_type": "corrupted",
                    "message": "The PDF document contains zero pages. Please upload a valid resume.",
                    "detected_extension": ext,
                    "file_size_bytes": file_size
                }
            doc.close()
        except Exception as e:
            # Check if pdfplumber can open it or if it's corrupted
            try:
                import pdfplumber
                with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                    if len(pdf.pages) == 0:
                        raise ValueError("No pages")
            except Exception:
                return {
                    "is_valid": False,
                    "error_type": "corrupted",
                    "message": "Unable to read this document because the PDF appears corrupted. Please upload a clear PDF or DOCX version of your resume.",
                    "detected_extension": ext,
                    "file_size_bytes": file_size
                }

    # Integrity check for DOCX
    elif ext in [".docx", ".doc"]:
        try:
            from docx import Document
            doc = Document(io.BytesIO(file_bytes))
            # Just test accessing paragraphs
            _ = len(doc.paragraphs)
        except Exception:
            return {
                "is_valid": False,
                "error_type": "corrupted",
                "message": "Unable to read this document. The DOCX file appears corrupted or uses an unreadable encoding.",
                "detected_extension": ext,
                "file_size_bytes": file_size
            }

    return {
        "is_valid": True,
        "error_type": None,
        "message": "File validated successfully.",
        "detected_extension": ext,
        "file_size_bytes": file_size
    }
