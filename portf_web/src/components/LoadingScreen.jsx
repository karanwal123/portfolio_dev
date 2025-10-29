import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("WELCOME");
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    // Animated dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 50);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const original = "WELCOME";
      const glitchChars = "█▓▒░!@#$%^&*";
      if (Math.random() > 0.85) {
        const glitched = original
          .split("")
          .map((char) =>
            Math.random() > 0.7
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("");
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(original), 100);
      }
    }, 200);

    // Generate floating cursors
    const cursorInterval = setInterval(() => {
      const newCursor = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 0.5,
      };
      setCursors((prev) => [...prev.slice(-8), newCursor]);
    }, 800);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Floating Cursors */}
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            animation: `float ${cursor.duration}s ease-in-out ${cursor.delay}s infinite`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </div>
      ))}

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        {/* Main Container */}
        <div className="border-4 border-white bg-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          {/* Main Title with Glitch */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white font-mono">
            {glitchText}
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-white font-mono">
            to Aditya's Portfolio
          </h2>

          {/* Loading Text */}
          <div className="text-xl md:text-2xl mb-6 font-mono text-white">
            Loading{dots}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto border-2 border-white p-1 bg-black">
            <div
              className="h-4 bg-white transition-all duration-100"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Status Messages */}
          <div className="mt-6 text-left font-mono text-sm md:text-base max-w-md mx-auto space-y-2 text-white">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 inline-block border-2 border-white bg-black"></span>
              <span>&gt; Initializing Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 inline-block border-2 border-white bg-black"></span>
              <span>&gt; Loading Components</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 inline-block border-2 border-white bg-black"></span>
              <span>&gt; Establishing Connection</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(${Math.random() * 60 - 30}px, ${
        Math.random() * 60 - 30
      }px) rotate(${Math.random() * 360}deg);
            opacity: 0.8;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 100 - 50}px, ${
        Math.random() * 100 - 50
      }px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
