import { getTwitterUserData } from "@/lib/twitterScraper";
import { analyzePersonality } from "@/utils/analyzePersonality";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { handle } = req.body;

    // Validate handle format
    if (!handle || typeof handle !== "string") {
      return res.status(400).json({
        success: false,
        error: "Twitter handle is required",
      });
    }

    // Clean handle
    const cleanHandle = handle.replace(/^@/, "").trim();
    if (!cleanHandle) {
      return res.status(400).json({
        success: false,
        error: "Invalid Twitter handle format",
      });
    }

    // Get Twitter data
    const twitterData = await getTwitterUserData(cleanHandle);
    if (!twitterData.success) {
      return res.status(400).json(twitterData);
    }

    // Analyze personality
    const personalityData = await analyzePersonality(
      twitterData.profile,
      twitterData.tweets
    );

    if (!personalityData.success) {
      return res.status(500).json({
        success: false,
        error: "Failed to analyze personality",
      });
    }

    // Return combined data
    return res.status(200).json({
      success: true,
      profile: twitterData.profile,
      tweets: twitterData.tweets,
      personality: personalityData.analysis,
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process request",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
