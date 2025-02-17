import { useState } from "react";
import TwitterProfileScraper from "@/components/TwitterProfileScraper";
import PersonalityCard from "@/components/PersonalityCard";

export default function Home() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = (data) => {
    setAnalysisData(data);
  };

  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Twitter Profile Analyzer</h1>

        <TwitterProfileScraper
          onAnalysis={handleAnalysis}
          onLoadingChange={setIsAnalyzing}
        />

        {isAnalyzing && (
          <div className="card">
            <div className="flex items-center justify-center space-x-2 py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span>Analyzing profile...</span>
            </div>
          </div>
        )}

        {!isAnalyzing && analysisData?.profile && (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">
                {analysisData.profile.name || "Unknown"}
              </h2>
              <p className="text-gray-600 mb-4">
                {analysisData.profile.description || "No description"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Followers:</span>{" "}
                  {(analysisData.profile.followers_count || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Following:</span>{" "}
                  {(analysisData.profile.following_count || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Personality Analysis */}
            {analysisData.personality && (
              <PersonalityCard personality={analysisData.personality} />
            )}

            {/* Recent Tweets */}
            {analysisData.tweets?.length > 0 ? (
              <div className="card">
                <h3 className="text-lg font-bold mb-4">Recent Tweets</h3>
                <div className="space-y-3">
                  {analysisData.tweets.slice(0, 5).map((tweet, index) => (
                    <p key={index} className="p-3 bg-gray-50 rounded-lg">
                      {tweet.text || "No tweet content"}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card">
                <h3 className="text-lg font-bold mb-4">Recent Tweets</h3>
                <p className="text-gray-600">No tweets available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
