import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateEnquiryInsights = async (enquiry) => {
  try {
    const prompt = `
    Return studentMailBody as HTML body content only.
Do not include greeting like "Dear ...".
Do not include signature, footer, subject, or placeholders like FRONTEND_URL.
Use the actual student name and course context naturally inside the paragraphs only.
    You are a sales counselor AI for a tech education academy. Analyse this student enquiry and respond ONLY with a valid JSON object — no markdown, no extra text.

Enquiry details:
Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Course interest: ${enquiry.courseName || "Not specified"}
Message: ${enquiry.message || "No message provided"}
Source: ${enquiry.source}

Return JSON with exactly these keys:
{
  "studentIntent": "one sentence describing what the student wants",
  "courseInterest": "course or field they seem most interested in",
  "leadQuality": "Hot | Warm | Cold",
  "suggestedTone": "one sentence on how to approach this lead",
  "actionRecommendation": "one concrete next step for the counselor",
  "studentMailBody": "a warm professional 3-paragraph HTML acknowledgement email body for the student. Reference their name and course. End with a call to action. Use <p> tags."
}`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content?.trim() || "";

    const clean = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(clean);
  } catch (error) {
    console.error("Groq enquiry insight generation failed:", error);
    throw new Error("Failed to generate enquiry insights");
  }
};