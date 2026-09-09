/**
 * API client to connect the React frontend with the Python FastAPI backend.
 * Provides resilient offline fallback if the Python server is offline.
 */

const BACKEND_BASE_URL = 'http://localhost:8000/api/v1';

export async function analyzeResumeApi(formData) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/resumes/analyze`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(10000) // 10s timeout
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.detail || 'Backend returned an error');
    }

    return await response.json();
  } catch (err) {
    console.warn('[ResumeLens] Live backend unreachable, falling back to deterministic client engine:', err.message);
    // Return client-side generated analysis report
    return null;
  }
}

export async function rewriteBulletApi(bulletPoint, skills = []) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/resumes/rewrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bullet_point: bulletPoint, skills })
    });
    if (response.ok) {
      const data = await response.json();
      return data.rewritten_bullet;
    }
  } catch (err) {
    console.warn('[ResumeLens] Rewrite API error:', err.message);
  }
  return null;
}

export async function generateCoverLetterApi(payload) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/cover-letter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const data = await response.json();
      return data.cover_letter;
    }
  } catch (err) {
    console.warn('[ResumeLens] Cover letter API error:', err.message);
  }
  return null;
}
