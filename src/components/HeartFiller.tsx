import { useState, useCallback } from "react";

interface HeartFillerProps {
  onComplete: () => void;
}

const HeartFiller = ({ onComplete }: HeartFillerProps) => {
  const [fillPercent, setFillPercent] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleHeartClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Add floating heart effect
    const heartId = Date.now() + Math.random();
    setFloatingHearts(prev => [...prev, { id: heartId, x, y }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 1000);

    setClicks(prev => prev + 1);
    setFillPercent(prev => {
      const newPercent = Math.min(prev + 2, 100);
      if (newPercent >= 100) {
        setTimeout(onComplete, 500);
      }
      return newPercent;
    });
  }, [onComplete]);

  const heartEmojis = ['💕', '💗', '💖', '❤️', '💓'];

  return (
    <div className="page-container relative overflow-hidden">
      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-heart-pink opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <h1 className="romantic-title mb-4 text-center animate-slide-up">
        Tap to Fill My Heart
      </h1>
      <p className="text-muted-foreground mb-8 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
        Keep tapping! 💕
      </p>

      {/* Main Heart Container */}
      <div 
        className="relative cursor-pointer select-none"
        onClick={handleHeartClick}
        onTouchStart={handleHeartClick}
      >
        {/* Empty Heart (Background) */}
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64 md:w-80 md:h-80 transition-transform duration-150 active:scale-95"
          style={{ filter: "drop-shadow(0 10px 30px rgba(236, 72, 153, 0.3))" }}
        >
          <defs>
            <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(350, 30%, 90%)" />
              <stop offset="100%" stopColor="hsl(350, 30%, 85%)" />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(350, 90%, 55%)" />
              <stop offset="50%" stopColor="hsl(350, 85%, 65%)" />
              <stop offset="100%" stopColor="hsl(340, 90%, 70%)" />
            </linearGradient>
            <clipPath id="heartClip">
              <path d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z" />
            </clipPath>
          </defs>
          
          {/* Empty heart outline */}
          <path
            d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z"
            fill="url(#emptyGradient)"
            stroke="hsl(350, 50%, 75%)"
            strokeWidth="2"
          />
          
          {/* Filled portion */}
          <g clipPath="url(#heartClip)">
            <rect
              x="0"
              y={100 - fillPercent}
              width="100"
              height={fillPercent}
              fill="url(#fillGradient)"
              className="transition-all duration-100"
            />
          </g>
          
          {/* Heart outline on top */}
          <path
            d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z"
            fill="none"
            stroke="hsl(350, 60%, 65%)"
            strokeWidth="3"
          />
        </svg>

        {/* Floating heart effects on click */}
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-float-up"
            style={{
              left: heart.x - 12,
              top: heart.y - 12,
            }}
          >
            <span className="text-2xl">
              {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
            </span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="w-48 h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full heart-gradient transition-all duration-150 rounded-full"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {fillPercent}% filled • {clicks} taps
        </span>
      </div>

      {fillPercent >= 100 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-bounce-in">
          <div className="text-center">
            <span className="text-6xl">💖</span>
            <p className="romantic-title mt-4">You filled my heart!</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
          }
        }
        .animate-float-up {
          animation: float-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeartFiller;
