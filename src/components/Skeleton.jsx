import React from 'react';

const Skeleton = ({ className = "", width = "100%", height = "1rem", borderRadius = "0.25rem" }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-stone-900 ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
