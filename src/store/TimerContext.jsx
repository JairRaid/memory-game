import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TimerContext = createContext({
  pause: () => {},
  resume: () => {},
  reset: () => {},
});

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(Date.now() - elapsedTime); // reference keeps previous elapsed time when resumed

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - startTimeRef.current;
      setElapsedTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = () => {
    startTimeRef.current = Date.now() - elapsedTime; // preserve elapsed time
    setIsRunning(true);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = Date.now();
  };

  const rawMinutes = Math.floor(elapsedTime / 60000);
  const rawSeconds = Math.floor((elapsedTime % 60000) / 1000);

  const minutes = rawMinutes;
  const seconds = String(rawSeconds).padStart(2, "0");

  const ctxValue = { minutes, seconds, isRunning, pause, resume, reset };

  return (
    <TimerContext.Provider value={ctxValue}>{children}</TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
