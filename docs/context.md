# Twitter Profile Scraper & AI-Generated Traits Component

## Overview

The Twitter Profile Scraper & AI-Generated Traits component is a reusable module built in Next.js. This component extracts publicly available Twitter/X profile data using **SocialData.Tools API** and uses AI to generate a structured JSON output summarizing the user's persona based on their profile and tweet activity.

The goal of this component is to allow seamless integration into the frontend, enabling avatars to be generated based on Twitter data insights.

## Features

- **Twitter/X Profile Scraping**: Extracts display name, bio, tweets, location, and engagement metrics via **SocialData.Tools API**.
- **AI Analysis of Personality Traits**: Determines MBTI type, hobbies, and key characteristics from tweet patterns.
- **Structured JSON Output**: Provides an easy-to-parse response containing user insights.
- **Frontend Integration Ready**: Designed as a Next.js component to be easily dropped into existing UI frameworks.

## Component Flow

### User Inputs Twitter Handle

- The component accepts a Twitter/X handle via an input field.
- It validates the handle format before proceeding.

### Data Fetching from SocialData.Tools API

The backend fetches public data using **SocialData.Tools API**, including:

- Display Name
- Bio
- Location
- Website (if available)
- Last 5-10 tweets
- Followers & Following count
- Engagement style (replies vs. original tweets)

### AI Personality Analysis

The AI model processes the extracted data to generate:

- Predicted occupation
- MBTI personality type
- Estimated age range
- Interests and hobbies
- Gender inference (if applicable)
- Unique personality traits

### JSON Output Generation

The processed data is structured into the following JSON format:

```json
{
  "name": "<Extracted from Twitter profile>",
  "occupation": "<Predicted based on bio and tweet content>",
  "mbti": "<AI-generated MBTI type based on engagement and tone>",
  "age": "<Predicted based on language and content>",
  "hobby": "<Determined from tweets and likes>",
  "gender": "<Inferred based on pronouns or profile cues>",
  "characteristics": [
    "<Unique trait 1>",
    "<Unique trait 2>",
    "<Unique trait 3>",
    "<Unique trait 4>",
    "<Unique trait 5>"
  ]
}
```

### Display and Integration

- The resulting data is displayed in a styled component.
- Can be integrated with other frontend features (e.g., avatar generation, user profile dashboard).

## Folder Structure

```
/components
  ├── TwitterProfileScraper.js  # Core Next.js component
  ├── AvatarGenerator.js        # UI for displaying AI-generated avatars
  ├── styles.module.css         # Styling for the components
/pages
  ├── api
    ├── fetchTwitterData.js     # Server-side function to fetch Twitter data
  ├── profile.js                # Page integrating the scraper
/utils
  ├── analyzePersonality.js     # AI analysis logic for personality traits
```

## API Dependencies

- **SocialData.Tools API**: Fetches Twitter profile data and tweets.
- **OpenAI API (gpt-4o-mini)**: For personality analysis and trait generation.
- **Axios**: For making HTTP requests.

## Core Implementation

### 1. Twitter Data Scraping

```javascript
// lib/twitterScraper.js
import axios from "axios";

export const getTwitterUserData = async (handle) => {
  try {
    const cleanHandle = handle.replace("@", "").trim().toLowerCase();

    // Get User Profile
    const profileUrl = `https://api.socialdata.tools/twitter/user/${cleanHandle}`;
    const profileResponse = await axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SOCIAL_DATA_TOOLS_API_KEY}`,
        Accept: "application/json",
      },
    });

    // Get User's Tweets
    const tweetsUrl = `https://api.socialdata.tools/twitter/search?query=from%3A${cleanHandle}&type=Latest`;
    const tweetsResponse = await axios.get(tweetsUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SOCIAL_DATA_TOOLS_API_KEY}`,
        Accept: "application/json",
      },
    });

    return {
      success: true,
      profile: profileResponse.data,
      tweets: tweetsResponse.data.tweets || [],
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Failed to fetch user data",
    };
  }
};
```

## Error Handling

### **Handling SocialData.Tools API Rate Limits**

```javascript
if (response.status === 402) {
  return {
    success: false,
    error: "Insufficient balance. Please add more credits.",
  };
}
```

## Installation & Setup

1. Install required dependencies:

```bash
npm install openai axios
```

2. Set up environment variables in `.env.local`:

```bash
SOCIAL_DATA_TOOLS_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

## Best Practices

### **API Usage**

- **Optimize requests**: Minimize calls to SocialData.Tools API to reduce costs.
- **Error Handling**: Provide fallbacks if API is unreachable.
- **Cache responses**: Store recent queries to avoid duplicate API calls.

### **Frontend Optimization**

- **Show loading states** when fetching Twitter data and processing AI analysis.
- **Handle errors gracefully** with proper UI feedback.

### **Security Considerations**

- **Store API keys securely** in `.env.local`.
- **Use only public Twitter data** (avoid processing private/sensitive data).

## Development Priorities (PoC)

✅ **Must Have:**

- **SocialData.Tools API integration**
- **OpenAI GPT-4o-mini analysis**
- **Basic UI with Tailwind CSS**
- **Error handling with fallbacks**
- **Environment variable security**

❌ **Not Required:**

- Data caching
- Database integration
- Advanced retry logic
- Comprehensive accessibility testing
- CI/CD pipeline

---

## **Conclusion**

This document outlines the **correct implementation using SocialData.Tools API** instead of Twitter API v2. It ensures that data extraction, AI processing, and frontend integration follow **best practices while avoiding Twitter API limitations**.

🚀 **Let me know if you need any refinements or additional explanations!**
