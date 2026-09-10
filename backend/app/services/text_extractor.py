"""
Text Extraction Service for ResumeLens.
Coordinates PyMuPDF, pdfplumber, python-docx, OCR fallback, and text normalization.
"""

from typing import Dict, Any, Optional
from ..parsers.pdf_parser import parse_pdf
from ..parsers.docx_parser import parse_docx
from ..parsers.text_cleaner import clean_text
from .ocr_service import perform_ocr_on_pdf_bytes

MIN_READABLE_TEXT_CHARS = 35

def extract_document_payload(
    file_bytes: Optional[bytes] = None,
    filename: str = "document.pdf",
    raw_text: Optional[str] = None
) -> Dict[str, Any]:
    """
    Extracts text and structural metadata from file bytes or raw text.
    
    Returns:
        Dict with keys:
            - text: str
            - filename: str
            - page_count: int
            - has_scanned_pages: bool
            - ocr_applied: bool
            - is_readable: bool
            - error_message: Optional[str]
            - layout_meta: Dict[str, Any]
    """
    if raw_text:
        cleaned = clean_text(raw_text)
        is_readable = len(cleaned.strip()) >= MIN_READABLE_TEXT_CHARS
        return {
            "text": cleaned,
            "filename": filename or "Pasted_Resume.txt",
            "page_count": 1,
            "has_scanned_pages": False,
            "ocr_applied": False,
            "is_readable": is_readable,
            "error_message": None if is_readable else "Text is too short or lacks readable characters.",
            "layout_meta": {
                "has_tables": False,
                "has_multi_column": False,
                "has_text_boxes": False,
                "has_tiny_fonts": False
            }
        }

    if not file_bytes:
        return {
            "text": "",
            "filename": filename,
            "page_count": 0,
            "has_scanned_pages": False,
            "ocr_applied": False,
            "is_readable": False,
            "error_message": "No document content provided.",
            "layout_meta": {}
        }

    fname_lower = (filename or "").lower()
    parsed_doc: Dict[str, Any] = {}
    ocr_applied = False

    if fname_lower.endswith(".pdf") or file_bytes.startswith(b"%PDF-"):
        parsed_doc = parse_pdf(file_bytes, filename)
        extracted_text = parsed_doc.get("text", "")
        
        # Check if text is sparse and document has images (scanned PDF)
        if len(extracted_text.strip()) < MIN_READABLE_TEXT_CHARS and parsed_doc.get("image_count", 0) > 0:
            ocr_res = perform_ocr_on_pdf_bytes(file_bytes)
            if ocr_res.get("success"):
                extracted_text = clean_text(ocr_res.get("ocr_text", ""))
                parsed_doc["text"] = extracted_text
                parsed_doc["has_scanned_pages"] = True
                ocr_applied = True
    elif fname_lower.endswith(".docx") or fname_lower.endswith(".doc") or file_bytes.startswith(b"PK\x03\x04"):
        parsed_doc = parse_docx(file_bytes, filename)
    else:
        # Fallback text decoding
        extracted_text = clean_text(file_bytes.decode("utf-8", errors="ignore"))
        parsed_doc = {
            "text": extracted_text,
            "filename": filename,
            "page_count": 1,
            "has_tables": False,
            "has_multi_column": False,
            "has_text_boxes": False,
            "has_tiny_fonts": False
        }

    full_text = parsed_doc.get("text", "").strip()
    is_readable = len(full_text) >= MIN_READABLE_TEXT_CHARS

    error_msg = None
    if not is_readable:
        if parsed_doc.get("has_scanned_pages") or parsed_doc.get("image_count", 0) > 0:
            error_msg = "We couldn't read enough information from this image-based document. Please upload a clearer PDF or DOCX resume."
        else:
            error_msg = "Unable to read this document. Please upload a clear PDF or DOCX version of your resume."

    return {
        "text": full_text,
        "filename": filename,
        "page_count": parsed_doc.get("page_count", 1),
        "has_scanned_pages": parsed_doc.get("has_scanned_pages", False),
        "ocr_applied": ocr_applied,
        "is_readable": is_readable,
        "error_message": error_msg,
        "layout_meta": {
            "has_tables": parsed_doc.get("has_tables", False),
            "has_multi_column": parsed_doc.get("has_multi_column", False),
            "has_text_boxes": parsed_doc.get("has_text_boxes", False),
            "has_tiny_fonts": parsed_doc.get("has_tiny_fonts", False),
            "image_count": parsed_doc.get("image_count", 0),
            "vector_graphics_count": parsed_doc.get("vector_graphics_count", 0)
        }
    }
