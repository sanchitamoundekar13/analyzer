"""
PDF Parser module for ResumeLens.
Supports multi-engine extraction:
- PyMuPDF (fitz) for text blocks, layout coordinates, font sizes, vector graphics
- pdfplumber for table & bounding box layout inspection
- OCR / Tesseract + OpenCV fallback for scanned image-only PDFs
"""

import io
import os
from typing import Dict, Any, List, Tuple
from .text_cleaner import clean_text

def parse_pdf(file_bytes: bytes, filename: str = "resume.pdf") -> Dict[str, Any]:
    """
    Parses a PDF document extracting full text, structural layout metadata,
    column splits, font sizes, tables, images, and OCR text if scanned.
    """
    extracted_text = ""
    pages_metadata = []
    total_pages = 0
    has_scanned_pages = False
    has_tables = False
    has_multi_column = False
    font_sizes = []
    vector_graphics_count = 0
    image_count = 0

    # Try PyMuPDF (fitz) first
    try:
        import fitz  # PyMuPDF
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        total_pages = len(doc)

        for page_idx, page in enumerate(doc):
            page_text = page.get_text("text")
            blocks = page.get_text("blocks")  # (x0, y0, x1, y1, text, block_no, block_type)
            page_images = page.get_images()
            page_drawings = page.get_drawings()

            image_count += len(page_images)
            vector_graphics_count += len(page_drawings)

            # Check for font sizes
            dict_blocks = page.get_text("dict").get("blocks", [])
            for b in dict_blocks:
                if b.get("type") == 0:  # Text block
                    for line in b.get("lines", []):
                        for span in line.get("spans", []):
                            sz = span.get("size", 11)
                            font_sizes.append(sz)

            # Check for 2-column or multi-column layout via x-coordinate distribution
            text_blocks = [b for b in blocks if b[4].strip() and b[6] == 0]
            if len(text_blocks) >= 4:
                page_width = page.rect.width
                left_col_blocks = [b for b in text_blocks if b[0] < page_width * 0.45 and b[2] < page_width * 0.55]
                right_col_blocks = [b for b in text_blocks if b[0] > page_width * 0.45]
                if len(left_col_blocks) >= 2 and len(right_col_blocks) >= 2:
                    has_multi_column = True

            # If page text is very sparse (< 40 chars) but has images, trigger OCR
            if len(page_text.strip()) < 40 and len(page_images) > 0:
                has_scanned_pages = True
                ocr_text = _perform_ocr_on_page(page)
                if ocr_text:
                    page_text = ocr_text

            extracted_text += f"\n--- Page {page_idx + 1} ---\n" + page_text
            pages_metadata.append({
                "page_number": page_idx + 1,
                "character_count": len(page_text.strip()),
                "is_scanned": has_scanned_pages,
                "images": len(page_images),
                "blocks_count": len(blocks)
            })

        doc.close()
    except Exception as e:
        # Fallback to pdfplumber or basic text extraction
        extracted_text, total_pages, has_tables = _fallback_pdfplumber(file_bytes)

    # Check for tables via pdfplumber
    try:
        import pdfplumber
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for p in pdf.pages:
                tables = p.extract_tables()
                if tables and len(tables) > 0:
                    has_tables = True
                    break
    except Exception:
        pass

    # Clean text
    normalized_text = clean_text(extracted_text)

    # Compute font statistics
    tiny_fonts = [f for f in font_sizes if f < 9.0]
    has_tiny_fonts = len(tiny_fonts) > (len(font_sizes) * 0.05) if font_sizes else False

    return {
        "text": normalized_text,
        "filename": filename,
        "page_count": max(1, total_pages),
        "has_scanned_pages": has_scanned_pages,
        "has_tables": has_tables,
        "has_multi_column": has_multi_column,
        "has_tiny_fonts": has_tiny_fonts,
        "image_count": image_count,
        "vector_graphics_count": vector_graphics_count,
        "pages_metadata": pages_metadata
    }

def _perform_ocr_on_page(page) -> str:
    """Performs OCR on a PyMuPDF page rendered to a high-res pixmap."""
    try:
        import pytesseract
        from PIL import Image
        pix = page.get_pixmap(dpi=200)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        ocr_result = pytesseract.image_to_string(img)
        return ocr_result
    except Exception:
        return ""

def _fallback_pdfplumber(file_bytes: bytes) -> Tuple[str, int, bool]:
    """Fallback parser using pdfplumber."""
    try:
        import pdfplumber
        text = ""
        has_tables = False
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            num_pages = len(pdf.pages)
            for p in pdf.pages:
                t = p.extract_text() or ""
                text += "\n" + t
                if p.extract_tables():
                    has_tables = True
            return text, num_pages, has_tables
    except Exception:
        # Ultimate fallback
        return file_bytes.decode("latin1", errors="ignore"), 1, False
