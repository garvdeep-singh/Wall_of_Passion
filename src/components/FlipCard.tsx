import React from "react";

interface FlipCardProps {
  name: string;
  headline: string;
  message: string;
  timestamp: string;
  photoUrl?: string;
  showHint?: boolean;
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

// function getRandomSnippet(message: string) {
//   if (!message) return "";
//   // Split by sentence-ending punctuation
//   const sentences = message.match(/[^.!?]+[.!?]?/g) || [];
//   if (sentences.length === 0) return message.slice(0, 40) + "...";
//   // Pick a random sentence, trim and add ellipsis
//   const snippet = sentences[Math.floor(Math.random() * sentences.length)].trim();
//   return `...${snippet}...`;
// }
// function getRandomSnippet(message: string) {
//   if (!message) return "";

//   // Trim the message and remove newlines
//   const cleanMessage = message.replace(/\s+/g, " ").trim();

//   // Limit to 20 characters max (or however many you prefer)
//   const snippet = cleanMessage.slice(0, 25);

//   return snippet.length < cleanMessage.length ? `${snippet}...` : snippet;
// }
// function getRandomSnippet(message: string) {
//   if (!message) return "";

//   const words = message.split(/\s+/).filter(Boolean);

//   if (words.length <= 4) {
//     return `...${words.join(" ")}...`;
//   }

//   // Pick a random start index to grab 2–4 words
//   const start = Math.floor(Math.random() * (words.length - 2));
//   const count = Math.floor(Math.random() * 6) + 2; // 2 to 4 words

//   const snippet = words.slice(start, start + count).join(" ");
//   return `...${snippet}...`;
// }

// function getRandomSnippet(message: string) {
//   if (!message) return "";

//   // Normalize spaces and remove extra whitespace
//   const cleanMessage = message.replace(/\s+/g, " ").trim();

//   // Split by punctuation marks (acts like sub-sentences)
//   const chunks = cleanMessage.match(/[^.!?]+[.!?]*/g);

//   if (!chunks || chunks.length === 0) {
//     // fallback to slicing a fixed character range
//     return `...${cleanMessage.slice(0, 80)}...`;
//   }

//   // Pick a random chunk
//   const randomIndex = Math.floor(Math.random() * chunks.length);
//   const snippet = chunks[randomIndex].trim();

//   return `...${snippet}...`;
// }

function getRandomSnippet(message: string) {
  if (!message) return "";

  // Normalize whitespace
  const cleanMessage = message.replace(/\s+/g, " ").trim();

  const words = cleanMessage.split(" ");
  const maxStart = Math.max(words.length - 8, 0); // ensure enough space

  const start = Math.floor(Math.random() * (maxStart + 1));
  // const length = Math.floor(Math.random() * 5) + 8; // 8 to 12 words
  const length = 12;

  const snippetWords = words.slice(start, start + length);
  const snippet = snippetWords.join(" ");

  return `...${snippet}...`;
}

export default function FlipCard({ name, headline, message, timestamp, photoUrl, showHint }: FlipCardProps) {
  const snippet = getRandomSnippet(message);

  return (
    <div className="flip-card w-full h-56">
      <div className="flip-card-inner w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front flex flex-row items-center bg-flipcard rounded-lg shadow-md text-white p-4 h-full relative">
          {/* <div className="flex-shrink-0 w-2/5 flex justify-center items-center h-full"> */}
          {/* <div className="flex-shrink-0 w-2/5 flex justify-start items-center h-full pl-2 pr-2"> */}
          <div className="flex-shrink-0 w-[36%] flex justify-center items-center h-full">
          {/* <div className="flex-shrink-0 w-[35%] flex justify-start items-center h-full pl-1"> */}
          
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                style={{ minWidth: '6rem', minHeight: '6rem', maxWidth: '6rem', maxHeight: '6rem' }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold"
                style={{ minWidth: '6rem', minHeight: '6rem', maxWidth: '6rem', maxHeight: '6rem' }}
              >
                {name[0]}
              </div>
            )}
          </div>
          {/* <div className="flex flex-col justify-center pl-4 w-3/5">
            <div className="text-xl font-bold text-white mb-1">{name}</div>
            <div className="text-base font-normal text-primary-foreground/80 mb-2">{headline}</div>
            <div className="text-sm italic text-white/70">{snippet}</div>
          </div> */}

          {/* <div className="flex flex-col justify-start pl-4 w-3/5 -mt-2"> */}
          {/* <div className="flex flex-col justify-start pl-4 pr-3 w-3/5 
          -mt-2"> */}
          {/* <div className="flex flex-col justify-start pl-6 pr-4 w-[56%] -mt-2"> */}

          {/* <div className="flex flex-col justify-start pl-0.5 w-3/5 -mt-2">
           */}
           <div className="flex flex-col justify-start pl-0 w-[64%] -mt-2">
  <div className="text-2xl font-bold text-white mb-1">{name}</div>
  <div className="text-lg font-medium text-primary-foreground/80 mb-5">{headline}</div>
  <div className="text-sm italic text-white/70">{snippet}</div>
</div>
          {showHint && (
            <span className="absolute bottom-2 right-4 text-white/40 text-xs font-medium select-none pointer-events-none">
              Hover to flip
            </span>
          )}
        </div>
        {/* Back Side */}
        {/* <div className="flip-card-back flex flex-col justify-center items-center bg-white rounded-lg shadow-md text-primary text-base p-4">
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
        </div> */}

        {/* Back Side */}
<div className="flip-card-back flex flex-col justify-center items-center bg-white rounded-lg shadow-md text-primary text-base p-4">
  {/* <blockquote className="text-foreground text-base leading-relaxed mb-4 text-center">
    "{message}"
  </blockquote> */}
  <blockquote className="text-foreground text-base leading-relaxed mb-4 text-center mt-4">
  "{message}"
</blockquote>
  {/* Name and timestamp intentionally hidden on the back side */}
</div>
      </div>
    </div>
  );
}

