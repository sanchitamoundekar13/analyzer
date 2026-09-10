"""
Text cleaner and normalizer module for ResumeLens.
Handles unicode normalization, ligatures repair, bullet standardization,
whitespace un-wrapping, and artifact character removal.
"""

import re
import unicodedata

LIGATURE_MAP = {
    "\ufb01": "fi",
    "\ufb02": "fl",
    "\ufb00": "ff",
    "\ufb03": "ffi",
    "\ufb04": "ffl",
    "\ufb05": "ft",
    "\ufb06": "st",
    "\u2010": "-",
    "\u2011": "-",
    "\u2012": "-",
    "\u2013": "-",
    "\u2014": "-",
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2022": "•",
    "\u25cf": "•",
    "\u25cb": "•",
    "\u25aa": "•",
    "\u25ab": "•",
    "\u2023": "•",
    "\u2043": "•",
    "\u00a0": " ",
}

def clean_text(raw_text: str) -> str:
    """Cleans and normalizes extracted resume raw text."""
    if not raw_text:
        return ""

    # Check for raw binary file stream signatures
    if raw_text.startswith("%PDF-") or raw_text.startswith("PK\x03\x04"):
        return ""

    # Check non-printable ratio
    non_printable = len(re.findall(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD]', raw_text))
    if len(raw_text) > 0 and (non_printable / len(raw_text)) > 0.08:
        return ""

    text = unicodedata.normalize("NFKD", raw_text)
    
    # Strip unprintable control characters and unicode replacement chars
    text = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD]', ' ', text)
    
    # Replace ligatures and non-standard dashes/quotes
    for bad_char, replacement in LIGATURE_MAP.items():
        text = text.replace(bad_char, replacement)

    # Normalize carriage returns and line feeds
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Fix broken hyphenated line breaks (e.g., "implemen-\nted" -> "implemented")
    text = re.sub(r'(\w+)-\n(\w+)', r'\1\2', text)

    # Standardize bullet points at start of line
    text = re.sub(r'^[ \t]*[\*\-\•\⁃\◦\‣\►\>]+\s*', '• ', text, flags=re.MULTILINE)

    # Compress multiple horizontal spaces into single space
    text = re.sub(r'[ \t]+', ' ', text)

    # Compress excessive consecutive newlines (max 2 newlines)
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()
