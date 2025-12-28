import { useState, useEffect } from 'react';

export const useKathmanduTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Kathmandu is UTC+5:45
      const kathmanduTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }));
      
      const hours = kathmanduTime.getHours().toString().padStart(2, '0');
      const minutes = kathmanduTime.getMinutes().toString().padStart(2, '0');
      const seconds = kathmanduTime.getSeconds().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};
