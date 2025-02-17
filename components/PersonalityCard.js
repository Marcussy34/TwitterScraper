import React from "react";

export default function PersonalityCard({ personality }) {
  if (!personality) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Personality Analysis</h3>

      <div className="grid gap-4">
        <div>
          <span className="font-semibold">Occupation:</span>
          <p className="text-gray-600">{personality.occupation}</p>
        </div>

        <div>
          <span className="font-semibold">MBTI Type:</span>
          <p className="text-gray-600">{personality.mbti}</p>
        </div>

        <div>
          <span className="font-semibold">Age Range:</span>
          <p className="text-gray-600">{personality.age}</p>
        </div>

        <div>
          <span className="font-semibold">Interests/Hobbies:</span>
          <p className="text-gray-600">{personality.hobby}</p>
        </div>

        <div>
          <span className="font-semibold">Gender:</span>
          <p className="text-gray-600">{personality.gender}</p>
        </div>

        <div>
          <span className="font-semibold">Key Characteristics:</span>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {personality.characteristics.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
