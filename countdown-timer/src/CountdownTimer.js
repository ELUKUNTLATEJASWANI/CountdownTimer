import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      setIsPaused(false);
    }
  }, [time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl font-bold mb-8">
        {formatTime(time)}
      </div>
      <div className="flex space-x-4">
        {!isActive && !isPaused && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleStart}>
            Start
          </button>
        )}
        {isActive && !isPaused && (
          <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handlePause}>
            Pause
          </button>
        )}
        {isActive && isPaused && (
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleResume}>
            Resume
          </button>
        )}
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
