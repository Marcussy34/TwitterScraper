# Twitter Profile Scraper & AI-Generated Traits Component

## Overview

The Twitter Profile Scraper & AI-Generated Traits component is a reusable module built in Next.js. This component extracts publicly available Twitter/X profile data using **SocialData.Tools API** and uses AI to generate a structured JSON output summarizing the user's persona based on their profile and tweet activity.

## Features

- **Twitter/X Profile Scraping**: Extracts display name, bio, tweets, location, and engagement metrics via **SocialData.Tools API**
- **AI Analysis of Personality Traits**: Determines MBTI type, hobbies, and key characteristics from tweet patterns
- **Structured JSON Output**: Provides an easy-to-parse response containing user insights
- **Frontend Integration Ready**: Designed as a Next.js component to be easily dropped into existing UI frameworks

## Prerequisites

- Next.js project (version 13 or higher)
- Node.js and npm installed
- SocialData.Tools API key
- OpenAI API key

## Component Flow

### User Inputs Twitter Handle

- The component accepts a Twitter/X handle via an input field
- It validates the handle format before proceeding

### Data Fetching from SocialData.Tools API

The backend fetches public data using **SocialData.Tools API**, including:

- Display Name
- Bio
- Location
- Last 5-10 tweets
- Followers & Following count

### AI Personality Analysis

The AI model processes the extracted data to generate:

- Predicted occupation
- MBTI personality type
- Estimated age range
- Interests and hobbies
- Gender inference (if applicable)
- Unique personality traits

### JSON Output Generation

The processed data is structured into a standardized JSON format:

```json
{
  "success": true,
  "profile": {
    "name": string,
    "description": string,
    "followers_count": number,
    "following_count": number,
    "location": string
  },
  "tweets": [
    {
      "text": string,
      "id": string
    }
  ],
  "personality": {
    "occupation": string,
    "mbti": string,
    "age": string,
    "hobby": string,
    "gender": string,
    "characteristics": string[]
  }
}
```

## Folder Structure

```
/components
  ├── TwitterProfileScraper.js  # Core Next.js component
  ├── PersonalityCard.js        # UI for displaying personality data
/lib
  ├── twitterScraper.js         # Twitter data fetching utility
/pages
  ├── api
    ├── twitter.js              # API endpoint for Twitter analysis
/utils
  ├── analyzePersonality.js     # AI analysis logic for personality traits
```

## API Dependencies

- **SocialData.Tools API**: Fetches Twitter profile data and tweets
- **OpenAI API (gpt-4o-mini)**: For personality analysis and trait generation
- **Axios**: For making HTTP requests

## Best Practices

### API Usage

- Optimize requests to minimize API calls
- Implement proper error handling
- Use environment variables for API keys

### Frontend Implementation

- Show loading states during analysis
- Handle errors gracefully
- Provide clear user feedback

### Security

- Store API keys in `.env.local`
- Add `.env.local` to `.gitignore`
- Process only public Twitter data

## Development Priorities

✅ **Must Have:**

- SocialData.Tools API integration
- OpenAI GPT-4o-mini analysis
- Basic UI with Tailwind CSS
- Error handling
- Environment variable security

❌ **Not Required:**

- Data caching
- Database integration
- Advanced retry logic
- Comprehensive accessibility testing
- CI/CD pipeline

---

For detailed integration steps, refer to the `guide.md` documentation.
