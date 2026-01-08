import type { SkillFeedback } from "../types/feedback";
import type { JobOfferInput, JobLevel } from "../types/job";

/**
 * Common tech stack keywords to detect in job descriptions
 */
const TECH_KEYWORDS = {
  frontend: [
    "react",
    "vue",
    "angular",
    "typescript",
    "javascript",
    "html",
    "css",
    "sass",
    "tailwind",
    "next.js",
    "nuxt",
    "svelte",
  ],
  backend: [
    "node.js",
    "nodejs",
    "python",
    "django",
    "flask",
    "java",
    "spring",
    "c#",
    ".net",
    "php",
    "laravel",
    "ruby",
    "rails",
    "go",
    "rust",
    "sql",
    "postgresql",
    "mysql",
    "mongodb",
  ],
  tools: [
    "git",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "ci/cd",
    "jenkins",
    "github actions",
    "webpack",
    "vite",
  ],
};

/**
 * Level indicators in job descriptions
 */
const LEVEL_INDICATORS = {
  intern: ["stage", "internship", "stagiare", "alternance"],
  junior: ["junior", "débutant", "entry level", "0-2 ans", "0-3 ans"],
  mid: ["mid", "intermédiaire", "3-5 ans", "3-7 ans", "confirmé"],
  senior: ["senior", "expert", "5+ ans", "7+ ans", "lead", "architect"],
};

/**
 * Analyzes a job description to extract skills and determine level
 */
export async function analyzeJobOffer(
  jobDescription: string
): Promise<JobOfferInput> {
  // Normalize text
  const normalizedText = jobDescription.toLowerCase();

  // Extract detected skills
  const detectedStack: string[] = [];
  const allKeywords = [
    ...TECH_KEYWORDS.frontend,
    ...TECH_KEYWORDS.backend,
    ...TECH_KEYWORDS.tools,
  ];

  // Check for each keyword
  allKeywords.forEach((keyword) => {
    if (normalizedText.includes(keyword.toLowerCase())) {
      // Capitalize properly
      const formattedKeyword =
        keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
      // Handle special cases
      if (keyword === "node.js" || keyword === "nodejs") {
        if (!detectedStack.includes("Node.js")) {
          detectedStack.push("Node.js");
        }
      } else if (keyword === "next.js") {
        if (!detectedStack.includes("Next.js")) {
          detectedStack.push("Next.js");
        }
      } else if (keyword === "ci/cd") {
        if (!detectedStack.includes("CI/CD")) {
          detectedStack.push("CI/CD");
        }
      } else if (!detectedStack.includes(formattedKeyword)) {
        detectedStack.push(formattedKeyword);
      }
    }
  });

  // If no skills detected, add some defaults based on common patterns
  if (detectedStack.length === 0) {
    if (normalizedText.includes("frontend") || normalizedText.includes("front-end")) {
      detectedStack.push("JavaScript", "HTML", "CSS");
    }
    if (normalizedText.includes("backend") || normalizedText.includes("back-end")) {
      detectedStack.push("Node.js", "SQL");
    }
    if (normalizedText.includes("fullstack") || normalizedText.includes("full-stack")) {
      detectedStack.push("React", "Node.js", "TypeScript");
    }
  }

  // Determine level
  let level: JobLevel = "mid"; // default
  for (const [jobLevel, indicators] of Object.entries(LEVEL_INDICATORS)) {
    if (indicators.some((indicator) => normalizedText.includes(indicator))) {
      level = jobLevel as JobLevel;
      break;
    }
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    rawText: jobDescription,
    detectedStack: detectedStack.length > 0 ? detectedStack : ["JavaScript", "React"],
    level,
  };
}

/**
 * Generates feedback based on interview transcript
 */
export async function generateFeedback(
  transcript: Array<{ role: string; text: string }>,
  jobOffer: JobOfferInput
): Promise<import("../types/feedback").InterviewFeedback> {
  // Analyze transcript
  const userMessages = transcript
    .filter((msg) => msg.role === "user")
    .map((msg) => msg.text.toLowerCase());
  // const assistantMessages = transcript
  //   .filter((msg) => msg.role === "assistant")
  //   .map((msg) => msg.text.toLowerCase());

  const allUserText = userMessages.join(" ");

  // Calculate scores based on transcript analysis
  let technicalScore = 50; // base score
  let communicationScore = 50;
  let clarityScore = 50;

  // Technical score indicators
  const technicalKeywords = jobOffer.detectedStack.map((s) => s.toLowerCase());
  const technicalMentions = technicalKeywords.filter((keyword) =>
    allUserText.includes(keyword)
  ).length;
  technicalScore = Math.min(
    100,
    50 + technicalMentions * 10 + (userMessages.length > 3 ? 20 : 0)
  );

  // Communication score (based on response length and engagement)
  const avgResponseLength =
    userMessages.reduce((sum, msg) => sum + msg.length, 0) / userMessages.length || 0;
  communicationScore = Math.min(
    100,
    50 + Math.floor(avgResponseLength / 10) + (userMessages.length > 2 ? 15 : 0)
  );

  // Clarity score (based on structured responses)
  const hasStructure = userMessages.some(
    (msg) => msg.includes("premièrement") || msg.includes("d'abord") || msg.includes("ensuite")
  );
  clarityScore = Math.min(100, 50 + (hasStructure ? 20 : 0) + (userMessages.length > 1 ? 15 : 0));

  // Generate strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (technicalScore >= 70) {
    strengths.push(
      `Bonne maîtrise des technologies mentionnées dans l'offre (${jobOffer.detectedStack.join(", ")})`
    );
  } else {
    weaknesses.push(
      `Approfondir les connaissances sur ${jobOffer.detectedStack.slice(0, 2).join(" et ")}`
    );
  }

  if (communicationScore >= 70) {
    strengths.push("Bonne capacité de communication et d'expression");
  } else {
    weaknesses.push("Améliorer la clarté et la structure des réponses");
  }

  if (clarityScore >= 70) {
    strengths.push("Réponses structurées et claires");
  } else {
    weaknesses.push("Structurer davantage les réponses (ex: premièrement, ensuite, enfin)");
  }

  // Skill-specific feedback
  const skillFeedback = jobOffer.detectedStack.slice(0, 3).map((skill) => {
    const skillMentioned = allUserText.includes(skill.toLowerCase());
    return {
      skill,
      level: skillMentioned
        ? (technicalScore >= 75 ? "strong" : "average")
        : ("weak" as const),
      comment: skillMentioned
        ? `A mentionné ${skill} dans les réponses.`
        : `Peut approfondir les connaissances sur ${skill}.`,
    };
  });

  // Recommendations
  const recommendations: string[] = [];
  if (technicalScore < 70) {
    recommendations.push(`Réviser les concepts de ${jobOffer.detectedStack[0]}`);
  }
  if (communicationScore < 70) {
    recommendations.push("S'entraîner à expliquer les concepts techniques à voix haute");
  }
  if (clarityScore < 70) {
    recommendations.push("Structurer les réponses avec des exemples concrets");
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    sessionId: `session-${Date.now()}`,
    globalSummary: `Entretien technique sur ${jobOffer.detectedStack.join(", ")}. ${
      technicalScore >= 70
        ? "Bonne performance technique avec des réponses pertinentes."
        : "Des progrès sont possibles sur les aspects techniques."
    } ${
      communicationScore >= 70
        ? "Excellente communication."
        : "La communication peut être améliorée."
    }`,
    strengths: strengths.length > 0 ? strengths : ["Bonne participation à l'entretien"],
    weaknesses: weaknesses.length > 0 ? weaknesses : ["Continuer à s'entraîner régulièrement"],
    skillFeedback: skillFeedback as SkillFeedback[],
    scores: {
      technical: Math.round(technicalScore),
      communication: Math.round(communicationScore),
      clarity: Math.round(clarityScore),
    },
    recommendations:
      recommendations.length > 0
        ? recommendations
        : ["Continuer à pratiquer régulièrement", "Réviser les concepts fondamentaux"],
  };
}
