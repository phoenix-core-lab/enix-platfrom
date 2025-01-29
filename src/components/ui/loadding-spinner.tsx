import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center gap-1 h-4" role="status" aria-label="Loading">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="w-1 bg-gray-500 rounded-full animate-loading"
          style={{
            animation: `loading 1s ease-in-out infinite`,
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes loading {
          0%, 100% {
            height: 4px;
          }
          50% {
            height: 16px;
          }
        }
        .animate-loading {
          height: 4px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
