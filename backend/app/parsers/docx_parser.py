"""
DOCX Parser module for ResumeLens.
Extracts structured text, headings, bullet lists, and tables using python-docx.
"""

import io
from typing import Dict, Any
from .text_cleaner import clean_text

def parse_docx(file_bytes: bytes, filename: str = "resume.docx") -> Dict[str, Any]:
    """
    Parses a DOCX file, detecting headings, tables, bullet points, and text boxes.
    """
    extracted_text = []
    has_tables = False
    has_text_boxes = False
    table_count = 0

    try:
        import docx
        doc = docx.Document(io.BytesIO(file_bytes))

        # Extract paragraphs
        for p in doc.paragraphs:
            p_text = p.text.strip()
            if not p_text:
                continue

            # Check if list bullet
            if p.style.name.startswith("List"):
                extracted_text.append(f"• {p_text}")
            elif p.style.name.startswith("Heading"):
                extracted_text.append(f"\n{p_text.upper()}\n")
            else:
                extracted_text.append(p_text)

        # Extract tables
        if len(doc.tables) > 0:
            has_tables = True
            table_count = len(doc.tables)
            for table in doc.tables:
                for row in table.rows:
                    row_cells = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                    if row_cells:
                        extracted_text.append(" | ".join(row_cells))

        # Inspect XML element for w:txbx (text boxes)
        xml_str = doc._element.xml
        if "w:txbx" in xml_str or "w:drawing" in xml_str:
            has_text_boxes = True

    except Exception as e:
        extracted_text.append(file_bytes.decode("utf-8", errors="ignore"))

    full_text = clean_text("\n".join(extracted_text))
    # Approximate page count for docx (~450 words/page)
    words = len(full_text.split())
    approx_pages = max(1, round(words / 450))

    return {
        "text": full_text,
        "filename": filename,
        "page_count": approx_pages,
        "has_tables": has_tables,
        "table_count": table_count,
        "has_multi_column": False,
        "has_text_boxes": has_text_boxes,
        "has_tiny_fonts": False,
        "image_count": 0,
        "vector_graphics_count": 0
    }
