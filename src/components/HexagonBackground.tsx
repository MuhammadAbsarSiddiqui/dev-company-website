import { memo } from "react";

export const HexagonBackground = memo(function HexagonBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-bg-primary overflow-hidden">
      
      {/* 
        ULTIMATE GPU PERFORMANCE UPGRADE:
        Instead of mutating SVG attributes via JavaScript (which triggers DOM updates and repaints),
        we render an oversized static SVG exactly ONCE.
        Then, we slide the entire wrapper using a pure CSS `transform: translate3d` animation. 
        This is 100% offloaded to the GPU compositor and ensures exactly 0 repaints.
        The SVG noise filter was also completely removed as `feTurbulence` causes massive layout thrashing in Chromium.
      */}
      <style>{`
        @keyframes hexMove {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-120px, -207.846px, 0); }
        }
        .hex-layer {
          animation: hexMove 3s linear infinite;
          will-change: transform;
        }
      `}</style>
      
      <div 
        className="hex-layer absolute transition-opacity duration-500 [opacity:var(--voronoi-opacity)] top-[-208px] left-[-120px] w-[calc(100%+240px)] h-[calc(100%+416px)]" 
      >
        <svg className="w-full h-full">
          <defs>
            <pattern 
              id="hexagons" 
              width="120" 
              height="207.846" 
              patternUnits="userSpaceOnUse" 
              patternTransform="rotate(45)"
            >
              {/* Fake Drop Shadow for performance */}
              <path 
                d="M60 207.846L0 173.206L0 103.924L60 69.282L120 103.924L120 173.206Z M30 51.962L0 34.642L0 -34.642L30 -51.962L60 -34.642L60 34.642Z M90 51.962L60 34.642L60 -34.642L90 -51.962L120 -34.642L120 34.642Z" 
                stroke="rgba(0,0,0,0.5)" 
                strokeWidth="4" 
                strokeLinejoin="round" 
                fill="none"
                transform="translate(-2, 4)" 
              />
              {/* Main Vector Lines */}
              <path 
                d="M60 207.846L0 173.206L0 103.924L60 69.282L120 103.924L120 173.206Z M30 51.962L0 34.642L0 -34.642L30 -51.962L60 -34.642L60 34.642Z M90 51.962L60 34.642L60 -34.642L90 -51.962L120 -34.642L120 34.642Z" 
                stroke="var(--text-muted)" 
                strokeWidth="4" 
                strokeLinejoin="round" 
                fill="none" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Dimming overlay to push background back into layout depth */}
      <div className="absolute inset-0 bg-bg-primary opacity-20" />
      
    </div>
  );
});
