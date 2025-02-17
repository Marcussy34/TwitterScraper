import OpenAI from "openai";

const openai = new OpenAI();

export const analyzePersonality = async (profile, tweets) => {
  try {
    const userData = {
      name: profile.name,
      bio: profile.description,
      location: profile.location || "Not specified",
      tweets: tweets.map((tweet) => tweet.text).join("\n"),
      followersCount: profile.followers_count,
      followingCount: profile.following_count,
    };

    const prompt = `Analyze this Twitter user's profile and tweets to create a detailed personality analysis.
    
Profile Data:
${JSON.stringify(userData, null, 2)}

Provide a structured analysis. Return ONLY a valid JSON object with no additional text, following this exact format:
{
  "occupation": "predicted occupation",
  "mbti": "MBTI personality type",
  "age": "estimated age range",
  "hobby": "main interests/hobbies",
  "gender": "inferred gender if apparent",
  "characteristics": ["trait1", "trait2", "trait3", "trait4", "trait5"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert personality analyst. You must respond with valid JSON only, no additional text or explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      store: true,
    });

    // Parse the response content as JSON
    try {
      const analysis = JSON.parse(completion.choices[0].message.content.trim());
      return {
        success: true,
        analysis,
      };
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return {
        success: false,
        error: "Failed to parse personality analysis",
      };
    }
  } catch (error) {
    console.error("Personality Analysis Error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze personality",
    };
  }
};
