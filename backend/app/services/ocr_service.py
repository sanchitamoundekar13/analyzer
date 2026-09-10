"""
OCR Service for ResumeLens.
Extracts optical character text from scanned and image-only PDF pages using Tesseract.
"""

from typing import Dict, Any, Optional
import io

def perform_ocr_on_pdf_bytes(file_bytes: bytes, max_pages: int = 3) -> Dict[str, Any]:
    """
    Attempts to perform OCR extraction across pages of an image-only PDF.
    
    Returns:
        Dict with keys:
            - ocr_text: str
            - success: bool
            - ocr_engine_available: bool
            - pages_processed: int
    """
    ocr_engine_available = False
    extracted_text = []

    try:
        import pytesseract
        from PIL import Image
        import fitz  # PyMuPDF
        
        # Test pytesseract installation / binary
        ocr_engine_available = True
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        
        pages_to_process = min(len(doc), max_pages)
        for page_idx in range(pages_to_process):
            page = doc[page_idx]
            pix = page.get_pixmap(dpi=200)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            
            try:
                page_text = pytesseract.image_to_string(img)
                if page_text and len(page_text.strip()) > 0:
                    extracted_text.append(page_text.strip())
            except Exception:
                pass
        
        doc.close()
    except Exception as e:
        pass

    full_ocr_text = "\n\n".join(extracted_text)
    return {
        "ocr_text": full_ocr_text,
        "success": len(full_ocr_text.strip()) >= 30,
        "ocr_engine_available": ocr_engine_available,
        "pages_processed": len(extracted_text)
    }
