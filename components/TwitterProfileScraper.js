import { useState } from "react";

export default function TwitterProfileScraper({ onAnalysis, onLoadingChange }) {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onLoadingChange?.(true);
    setError(null);

    try {
      const response = await fetch("/api/twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle }),
      });

      const result = await response.json();

      if (result.success) {
        onAnalysis(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to analyze profile");
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="handle" className="block text-sm font-medium mb-2">
            Twitter Handle
          </label>
          <input
            id="handle"
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@username"
            className="input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !handle}
          className="btn-primary w-full"
        >
          {loading ? "Analyzing..." : "Analyze Profile"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
