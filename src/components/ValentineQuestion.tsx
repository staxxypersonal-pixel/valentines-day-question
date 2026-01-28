import { useState } from "react";
import catGun from "@/assets/cat-gun.gif";
import catKiss from "@/assets/cat-kiss.gif";
import mortCrying from "@/assets/mort-crying.gif";
import celebration from "@/assets/celebration.png";

type ViewState = "question" | "yes" | "no";

const ValentineQuestion = () => {
  const [viewState, setViewState] = useState<ViewState>("question");
  const [noClickCount, setNoClickCount] = useState(0);

  const handleYes = () => {
    setViewState("yes");
  };

  const handleNo = () => {
    setNoClickCount(prev => prev + 1);
    setViewState("no");
  };

  const handleGoBack = () => {
    setViewState("question");
  };

  // Calculate yes button scale based on no clicks
  const yesButtonScale = 1 + (noClickCount * 0.15);
  const yesButtonPadding = 16 + (noClickCount * 4);

  // Yes page - celebration
  if (viewState === "yes") {
    return (
      <div className="page-container relative overflow-hidden">
        {/* Floating hearts around the edges, not over content */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side hearts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 15}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Right side hearts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute animate-float"
              style={{
                right: `${Math.random() * 15}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Top hearts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`top-${i}`}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 20}%`,
                top: `${Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Bottom hearts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 20}%`,
                bottom: `${Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="text-center animate-bounce-in z-10 relative">
          <img 
            src={catKiss} 
            alt="Cat kiss" 
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-contain"
          />
          <img 
            src={celebration} 
            alt="Celebration" 
            className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-6 object-contain"
          />
          <h1 className="romantic-title text-4xl md:text-6xl mb-4">
            Yipeeee!!! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-primary font-romantic">
            I knew it! I love you so much! 💖💖💖
          </p>
        </div>
      </div>
    );
  }

  // No page - sad with go back button
  if (viewState === "no") {
    return (
      <div className="page-container">
        <div className="text-center animate-bounce-in">
          <img 
            src={mortCrying} 
            alt="Crying" 
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-contain"
          />
          <p className="text-2xl md:text-3xl font-romantic text-primary mb-8">
            Are you sure? 😢
          </p>
          <button
            onClick={handleGoBack}
            className="valentine-button text-lg px-8 py-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Question page
  return (
    <div className="page-container">
      <div className="text-center max-w-lg mx-auto">
        {/* Cat with gun */}
        <img 
          src={catGun} 
          alt="Cat" 
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-2xl object-contain animate-float"
        />

        <h1 className="romantic-title text-4xl md:text-5xl mb-12 animate-slide-up">
          Will you be my Valentine? 💝
        </h1>

        <div className="flex flex-wrap justify-center gap-6 items-center">
          {/* Yes Button - grows with each no click */}
          <button
            onClick={handleYes}
            className="valentine-button font-bold transition-all duration-300"
            style={{
              transform: `scale(${yesButtonScale})`,
              padding: `${yesButtonPadding}px ${yesButtonPadding * 2}px`,
              fontSize: `${18 + noClickCount * 2}px`,
            }}
          >
            Yes! 💖
          </button>

          {/* No Button - stays the same size */}
          <button
            onClick={handleNo}
            className="px-6 py-3 rounded-full font-semibold text-muted-foreground bg-secondary hover:bg-secondary/80 transition-all duration-300"
          >
            No...
          </button>
        </div>

        {noClickCount > 0 && (
          <p className="mt-8 text-muted-foreground text-sm animate-slide-up">
            You've said no {noClickCount} time{noClickCount > 1 ? 's' : ''}... the Yes button is getting bigger! 😏
          </p>
        )}
      </div>
    </div>
  );
};

export default ValentineQuestion;
