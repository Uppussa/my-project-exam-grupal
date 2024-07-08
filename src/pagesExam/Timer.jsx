import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp, running }) => { 
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!running) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, running, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="text-xl font-bold">
      Tiempo restante: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
