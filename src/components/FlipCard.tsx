import React from "react";

interface FlipCardProps {
  name: string;
  headline: string;
  message: string;
  timestamp: string;
  photoUrl?: string;
}

function formatDate(dateString: string) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Recently';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function FlipCard({ name, headline, message, timestamp, photoUrl }: FlipCardProps) {
  return (
    <div className="flip-card w-full h-56">
      <div className="flip-card-inner w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front flex flex-row items-center bg-flipcard rounded-lg shadow-md text-white p-4 h-full">
          <div className="flex-shrink-0 w-2/5 flex justify-center items-center h-full">
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="h-38 w-38 rounded-full object-cover border-4 border-white shadow" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold">
                {name[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center pl-4 w-3/5">
            <div className="text-xl font-bold text-white">{name}</div>
            <div className="text-base font-normal mt-2 text-primary-foreground/80">{headline}</div>
          </div>
        </div>
        {/* Back Side */}
        <div className="flip-card-back flex flex-col justify-center items-center bg-white rounded-lg shadow-md text-primary text-base p-4">
          <blockquote className="text-foreground text-base leading-relaxed mb-4 text-center">
            "{message}"
          </blockquote>
          <div className="flex flex-col items-center">
            <cite className="font-semibold text-primary not-italic mb-1">
              — {name}
            </cite>
            <time className="text-xs text-muted-foreground">
              {formatDate(timestamp)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}