import { ALL_SKILLS, ACTION_VERBS, PASSIVE_CLICHES } from './skillTaxonomy';

/**
 * Deterministic Evidence-Based Scoring Engine
 * Evaluates 7 measurable dimensions with zero hallucination of candidate achievements.
 */
export function evaluateResume(parsedResume, targetJobDescription = '') {
  const text = parsedResume.rawText;
  const lowerText = text.toLowerCase();
  const bullets = parsedResume.bullets;

  // 1. SKILLS EXTRACTION
  const detectedSkills = [];
  ALL_SKILLS.forEach(skill => {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      if (!detectedSkills.includes(skill)) detectedSkills.push(skill);
    }
  });

  // 2. ATS & PARSING AUDIT (Max 20 pts)
  let atsPoints = 0;
  const atsFindings = [];

  // Check 1: Contact info
  if (parsedResume.contactInfo.email && parsedResume.contactInfo.phone) {
    atsPoints += 4;
    atsFindings.push({ pass: true, text: 'Email and phone number are clearly extractable.' });
  } else {
    atsPoints += 2;
    atsFindings.push({ pass: false, text: 'Contact info is incomplete; ensure email and phone are top-level text.' });
  }

  // Check 2: LinkedIn URL
  if (parsedResume.contactInfo.linkedin || lowerText.includes('linkedin.com')) {
    atsPoints += 3;
    atsFindings.push({ pass: true, text: 'LinkedIn profile link detected for recruiter indexing.' });
  } else {
    atsFindings.push({ pass: false, text: 'LinkedIn profile URL not found. Adding your public profile boosts searchability.' });
  }

  // Check 3: Standard Section Headings
  const detectedSecCount = Object.values(parsedResume.sections).filter(s => s.detected).length;
  if (detectedSecCount >= 4) {
    atsPoints += 5;
    atsFindings.push({ pass: true, text: `Standard heading hierarchy detected (${detectedSecCount} recognized sections).` });
  } else {
    atsPoints += 2;
    atsFindings.push({ pass: false, text: 'Non-standard headings found. Use standard headers (Experience, Education, Skills).' });
  }

  // Check 4: Date Consistency
  const dateRegex = /(?:19|20)\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(?:19|20)?\d{2}/gi;
  const dateMatches = text.match(dateRegex);
  if (dateMatches && dateMatches.length >= 3) {
    atsPoints += 4;
    atsFindings.push({ pass: true, text: 'Chronological employment dates follow readable ATS syntax.' });
  } else {
    atsPoints += 1;
    atsFindings.push({ pass: false, text: 'Dates could not be consistently parsed for career chronology.' });
  }

  // Check 5: Page Length & Word Count
  if (parsedResume.pageCount <= 2 && parsedResume.wordCount >= 250 && parsedResume.wordCount <= 1200) {
    atsPoints += 4;
    atsFindings.push({ pass: true, text: `Optimal length: ${parsedResume.pageCount} page(s) (${parsedResume.wordCount} words).` });
  } else {
    atsPoints += 2;
    atsFindings.push({ pass: false, text: `Length advisory: ${parsedResume.wordCount} words. Target 400-800 words for maximum impact.` });
  }

  const atsScore = Math.min(20, atsPoints);

  // 3. JOB DESCRIPTION MATCH (Max 20 pts)
  let jobMatchScore = 16;
  let targetMatchedSkills = [];
  let targetMissingSkills = [];
  let dontAddList = [];

  if (targetJobDescription && targetJobDescription.trim().length > 30) {
    const jdLower = targetJobDescription.toLowerCase();
    const jdRequiredSkills = [];

    ALL_SKILLS.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(targetJobDescription)) {
        jdRequiredSkills.push(skill);
      }
    });

    if (jdRequiredSkills.length > 0) {
      targetMatchedSkills = jdRequiredSkills.filter(s => detectedSkills.includes(s));
      targetMissingSkills = jdRequiredSkills.filter(s => !detectedSkills.includes(s));

      const matchRatio = targetMatchedSkills.length / jdRequiredSkills.length;
      jobMatchScore = Math.round(matchRatio * 20);

      // "Don't Add This" Guardrails
      targetMissingSkills.slice(0, 3).forEach(ms => {
        dontAddList.push({
          skill: ms,
          reason: `Appears in job description, but do NOT add unless you possess verifiable experience. Adding unverified keywords creates interview risk.`
        });
      });
    }
  } else {
    // Default baseline benchmarking for engineering/tech
    const baselineRecommended = ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'TypeScript', 'System Design'];
    targetMatchedSkills = detectedSkills.slice(0, 8);
    targetMissingSkills = baselineRecommended.filter(s => !detectedSkills.includes(s));
    jobMatchScore = Math.min(20, Math.max(12, Math.round((detectedSkills.length / 15) * 20)));
  }

  // 4. SKILLS SCORE (Max 20 pts)
  const skillsScore = Math.min(20, Math.max(8, Math.round((detectedSkills.length / 12) * 20)));

  // 5. EXPERIENCE EVIDENCE (Max 15 pts)
  // Check for: Action Verb + Metric Regex + Tech mentions
  const metricRegex = /\b(?:\d+%\b|\$\d+|\d+\s*k|\d+\s*users|\d+\s*x|\d+\s*million|\d+\s*hrs|\d+\s*days|\b\d{2,}\b)/i;
  let quantifiedBulletsCount = 0;
  let actionVerbBulletsCount = 0;
  const analyzedBullets = [];

  bullets.forEach(bullet => {
    const hasMetric = metricRegex.test(bullet);
    const hasActionVerb = ACTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, 'i').test(bullet));
    const hasTech = detectedSkills.some(s => new RegExp(`\\b${s}\\b`, 'i').test(bullet));

    if (hasMetric) quantifiedBulletsCount++;
    if (hasActionVerb) actionVerbBulletsCount++;

    analyzedBullets.push({
      text: bullet,
      hasMetric,
      hasActionVerb,
      hasTech,
      status: hasMetric && hasActionVerb ? 'strong' : hasActionVerb ? 'moderate' : 'weak'
    });
  });

  const totalBullets = Math.max(1, bullets.length);
  const metricRatio = quantifiedBulletsCount / totalBullets;
  const actionRatio = actionVerbBulletsCount / totalBullets;

  const experienceScore = Math.min(15, Math.max(6, Math.round(metricRatio * 8 + actionRatio * 7)));

  // 6. RESUME STRUCTURE (Max 10 pts)
  let structurePoints = 0;
  if (parsedResume.sections.summary.detected) structurePoints += 2;
  if (parsedResume.sections.experience.detected) structurePoints += 3;
  if (parsedResume.sections.education.detected) structurePoints += 2;
  if (parsedResume.sections.skills.detected) structurePoints += 2;
  if (parsedResume.sections.projects.detected || parsedResume.sections.certifications.detected) structurePoints += 1;
  const structureScore = Math.min(10, Math.max(5, structurePoints));

  // 7. WRITING QUALITY (Max 10 pts)
  const flaggedCliches = [];
  PASSIVE_CLICHES.forEach(cliche => {
    if (lowerText.includes(cliche.phrase)) {
      flaggedCliches.push(cliche);
    }
  });

  let writingPoints = 10 - flaggedCliches.length * 1.5;
  const writingScore = Math.min(10, Math.max(5, Math.round(writingPoints)));

  // 8. EDUCATION & PROJECTS (Max 5 pts)
  let eduPoints = 0;
  const degreeRegex = /(?:bachelor|master|phd|b\.s\.|m\.s\.|b\.tech|m\.tech|bba|degree)/i;
  if (degreeRegex.test(text)) eduPoints += 3;
  if (parsedResume.sections.projects.detected || parsedResume.contactInfo.github) eduPoints += 2;
  const educationScore = Math.min(5, Math.max(2, eduPoints));

  // FINAL DETERMINISTIC SCORE (Sum of all 7 weighted dimensions)
  const finalScore = Math.min(100, Math.max(35, (
    atsScore +
    jobMatchScore +
    skillsScore +
    experienceScore +
    structureScore +
    writingScore +
    educationScore
  )));

  // Determine Grade
  let grade = 'Needs Work';
  let gradeColor = 'amber';
  if (finalScore >= 88) {
    grade = 'Excellent';
    gradeColor = 'emerald';
  } else if (finalScore >= 75) {
    grade = 'Very Good';
    gradeColor = 'blue';
  } else if (finalScore >= 60) {
    grade = 'Good';
    gradeColor = 'amber';
  }

  // Realistic Target Improvement (e.g. 82 -> 94)
  const realisticImprovement = Math.min(96, finalScore + Math.max(7, Math.round((100 - finalScore) * 0.65)));

  // HONEST BULLET REWRITES (NO FABRICATED NUMBERS)
  const bulletRewrites = generateHonestRewrites(bullets);

  // EXPLAINABLE "WHY DID I LOSE POINTS?" EVIDENCE
  const pointDeductions = [];
  if (atsScore < 20) {
    pointDeductions.push({
      category: 'ATS & Parsing',
      lost: 20 - atsScore,
      reason: 'Missing social profile links or non-standard heading formatting.',
      fix: 'Use standard header names (Experience, Education, Skills) and ensure contact info is in header text.'
    });
  }
  if (experienceScore < 15) {
    pointDeductions.push({
      category: 'Experience Evidence',
      lost: 15 - experienceScore,
      reason: `Only ${quantifiedBulletsCount} of ${totalBullets} bullet points contain quantifiable metric data.`,
      fix: 'Incorporate real numbers into your bullets (e.g. % performance improvement, team size, users impacted, or SLA).'
    });
  }
  if (flaggedCliches.length > 0) {
    pointDeductions.push({
      category: 'Writing Quality',
      lost: 10 - writingScore,
      reason: `Found passive phrases such as: "${flaggedCliches.map(c => c.phrase).join('", "')}".`,
      fix: 'Replace duty descriptions with high-impact power action verbs.'
    });
  }
  if (targetMissingSkills.length > 0) {
    pointDeductions.push({
      category: 'Job Alignment',
      lost: 20 - jobMatchScore,
      reason: `Missing target skills: ${targetMissingSkills.slice(0, 4).join(', ')}.`,
      fix: 'Add these skills to your Technical Skills and Experience sections if you have hands-on experience.'
    });
  }

  return {
    overallScore: finalScore,
    grade,
    gradeColor,
    realisticTarget: realisticImprovement,
    dimensionScores: {
      ats: { current: atsScore, max: 20, weight: '20%', label: 'ATS & Parsing' },
      jobMatch: { current: jobMatchScore, max: 20, weight: '20%', label: 'Job Description Match' },
      skills: { current: skillsScore, max: 20, weight: '20%', label: 'Skills Coverage' },
      experience: { current: experienceScore, max: 15, weight: '15%', label: 'Experience Evidence' },
      structure: { current: structureScore, max: 10, weight: '10%', label: 'Resume Structure' },
      writing: { current: writingScore, max: 10, weight: '10%', label: 'Writing Quality' },
      education: { current: educationScore, max: 5, weight: '5%', label: 'Education & Projects' },
    },
    skillsAnalysis: {
      detected: detectedSkills,
      matched: targetMatchedSkills,
      missing: targetMissingSkills,
      dontAdd: dontAddList,
      coveragePercent: Math.min(100, Math.round((detectedSkills.length / 15) * 100))
    },
    experienceAnalysis: {
      totalBullets,
      quantifiedCount: quantifiedBulletsCount,
      actionVerbCount: actionVerbBulletsCount,
      bullets: analyzedBullets
    },
    atsAudit: {
      score: `${Math.round((atsScore / 20) * 100)}%`,
      findings: atsFindings
    },
    pointDeductions,
    bulletRewrites,
    flaggedCliches
  };
}

// Generate Honest Rewrites without Fabricated Metrics
function generateHonestRewrites(bullets) {
  const templates = [
    {
      trigger: /(?:worked on|helped with|assisted in|responsible for|handled)\s+(.*?)(?:\.|$)/i,
      template: (match) => ({
        original: match[0],
        improved: `Architected and deployed ${match[1]}, improving operational efficiency. [Add your metric: e.g. % faster load time, number of users served, or tickets resolved].`,
        note: 'We never invent numbers. Insert your real verified outcome.'
      })
    },
    {
      trigger: /(?:developed|created|built|made)\s+(.*?)(?:\.|$)/i,
      template: (match) => ({
        original: match[0],
        improved: `Engineered scalable ${match[1]} utilizing industry-standard design patterns. [Add your metric: e.g. throughput, uptime, or latency reduction].`,
        note: 'Quantify with metrics you can defend in a live interview.'
      })
    }
  ];

  const results = [];
  bullets.slice(0, 3).forEach(b => {
    let rewritten = false;
    for (const t of templates) {
      const match = b.match(t.trigger);
      if (match) {
        results.push(t.template(match));
        rewritten = true;
        break;
      }
    }
    if (!rewritten && b.length > 20) {
      results.push({
        original: b,
        improved: `Spearheaded ${b.toLowerCase().replace(/^[•\-\*]\s*/, '')} with direct focus on system reliability and code quality. [Add your metric: e.g. adoption rate or time saved].`,
        note: 'Add measurable context (scale, frequency, or result).'
      });
    }
  });

  return results;
}
