# Twitter Profile Scraper Integration Guide

This guide will help you integrate the Twitter Profile Scraper component into your Next.js project.

## Prerequisites

- Next.js project (version 13 or higher)
- Node.js and npm installed
- SocialData.Tools API key
- OpenAI API key

## Installation Steps

1. Install required dependencies:

```bash
npm install openai axios
```

2. Create environment variables by adding to your `.env.local`:

```bash
SOCIAL_DATA_TOOLS_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

## File Structure Setup

1. Create the following directory structure in your project:

```
/components
  ├── TwitterProfileScraper.js
  ├── PersonalityCard.js
/lib
  ├── twitterScraper.js
/pages
  ├── api
    ├── twitter.js    # API endpoint for Twitter analysis
/utils
  ├── analyzePersonality.js
```

2. Add required styles to your global CSS (if using Tailwind):

```css
.card {
  @apply rounded-lg border p-6;
}

.input {
  @apply w-full px-4 py-2 rounded-lg border transition-colors;
}

.btn-primary {
  @apply px-4 py-2 rounded-lg transition-colors;
}
```

## Component Integration

1. Copy the core components:

- TwitterProfileScraper.js (reference: ```javascript:components/TwitterProfileScraper.js
  startLine: 1
  endLine: 72

````)
- PersonalityCard.js (reference: ```javascript:components/PersonalityCard.js
startLine: 1
endLine: 47
```)

2. Copy the utility functions:
- twitterScraper.js (reference: ```javascript:lib/twitterScraper.js
startLine: 1
endLine: 51
```)
- analyzePersonality.js (reference: ```javascript:utils/analyzePersonality.js
startLine: 1
endLine: 68
```)

3. Create an API endpoint in `pages/api/twitter.js` (reference: ```javascript:pages/api/twitter.js
startLine: 1
endLine: 64
```)

## Usage in Your Project

1. Import and use the component in your page:
```javascript
import { useState } from "react";
import TwitterProfileScraper from "@/components/TwitterProfileScraper";
import PersonalityCard from "@/components/PersonalityCard";

export default function YourPage() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = (data) => {
    setAnalysisData(data);
  };

  return (
    <div>
      <TwitterProfileScraper
        onAnalysis={handleAnalysis}
        onLoadingChange={setIsAnalyzing}
      />

      {analysisData?.personality && (
        <PersonalityCard personality={analysisData.personality} />
      )}
    </div>
  );
}
````

## Data Structure

The component returns data in the following format:

```javascript
{
  success: true,
  profile: {
    name: string,
    description: string,
    followers_count: number,
    following_count: number,
    location: string
  },
  tweets: [
    {
      text: string,
      id: string
    }
  ],
  personality: {
    occupation: string,
    mbti: string,
    age: string,
    hobby: string,
    gender: string,
    characteristics: string[]
  }
}
```

## Error Handling

The component includes built-in error handling for:

- Invalid Twitter handles
- API rate limits
- Network errors
- Failed personality analysis

## Best Practices

1. **API Key Security**

   - Never expose API keys in client-side code
   - Use environment variables
   - Add `.env.local` to `.gitignore`

2. **Rate Limiting**

   - Implement caching for frequent requests
   - Add delay between consecutive API calls

3. **UI/UX**
   - Show loading states during analysis
   - Provide clear error messages
   - Handle empty states gracefully

## Customization

1. **Styling**

   - The component uses Tailwind CSS classes
   - Modify the card, input, and button styles in your CSS
   - Override the default styles using className props

2. **Personality Analysis**
   - Modify the prompt in analyzePersonality.js
   - Adjust the AI model parameters
   - Add additional analysis fields

## Troubleshooting

Common issues and solutions:

1. "API key not found" - Check environment variables
2. "Rate limit exceeded" - Verify API credits
3. "Failed to fetch" - Check network connection
4. "Invalid handle" - Ensure proper Twitter handle format

---

For more detailed information about the implementation, refer to the component documentation.

## Minimal Integration (Analysis Only)

If you only need the Twitter profile analysis functionality without the UI components, follow these steps:

1. Install required dependencies:

```bash
npm install openai axios
```

2. Set up environment variables in `.env.local`:

```bash
SOCIAL_DATA_TOOLS_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

3. Create the core utility files:

First, create `lib/twitterScraper.js`:

```javascript:lib/twitterScraper.js
startLine: 1
endLine: 51
```

Then, create `utils/analyzePersonality.js`:

```javascript:utils/analyzePersonality.js
startLine: 1
endLine: 68
```

4. Create a simple API endpoint (e.g., `pages/api/analyze-twitter.js`):

```javascript
import { getTwitterUserData } from "@/lib/twitterScraper";
import { analyzePersonality } from "@/utils/analyzePersonality";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { handle } = req.body;
    if (!handle) {
      return res.status(400).json({ error: "Twitter handle is required" });
    }

    const twitterData = await getTwitterUserData(handle);
    if (!twitterData.success) {
      return res.status(400).json(twitterData);
    }

    const personalityData = await analyzePersonality(
      twitterData.profile,
      twitterData.tweets
    );

    return res.status(200).json({
      success: true,
      analysis: personalityData.analysis,
      profile: twitterData.profile,
      tweets: twitterData.tweets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to analyze profile",
    });
  }
}
```

5. Usage example:

```javascript
// Example usage in any component or function
async function analyzeTwitterProfile(handle) {
  try {
    const response = await fetch("/api/analyze-twitter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ handle }),
    });

    const data = await response.json();
    if (data.success) {
      console.log("Profile Analysis:", data.analysis);
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
}
```

The analysis will return a JSON object in this format:

```javascript
{
  success: true,
  analysis: {
    occupation: string,
    mbti: string,
    age: string,
    hobby: string,
    gender: string,
    characteristics: string[]
  },
  profile: {
    name: string,
    description: string,
    followers_count: number,
    following_count: number,
    location: string
  },
  tweets: [
    {
      text: string,
      id: string
    }
  ]
}
```

This minimal integration provides just the analysis functionality without the UI components, making it easier to integrate into existing projects or use with different frontend frameworks.
