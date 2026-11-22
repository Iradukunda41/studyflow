import { useEffect, useRef, useState } from "react";

function FocusTimer() {
  const STUDY_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState("study");
  const [seconds, setSeconds] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  // Start the timer
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds <= 1) {
          setIsRunning(false);
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    // Cleanup interval
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function handleStartPause() {
    setIsRunning((previousValue) => !previousValue);
  }

  function handleReset() {
    setIsRunning(false);

    setSeconds(
      mode === "study"
        ? STUDY_TIME
        : BREAK_TIME
    );
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setIsRunning(false);

    setSeconds(
      newMode === "study"
        ? STUDY_TIME
        : BREAK_TIME
    );
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(
    remainingSeconds
  ).padStart(2, "0");

  return (
    <div className="mx-auto max-w-xl">
      {/* Mode Switcher */}
      <div className="mb-8 flex justify-center">
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => handleModeChange("study")}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              mode === "study"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Study
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("break")}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              mode === "break"
                ? "bg-white text-green-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Break
          </button>
        </div>
      </div>

      {/* Timer Card */}
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          {mode === "study"
            ? "Focus Session"
            : "Break Time"}
        </p>

        {/* Timer */}
        <div className="my-8">
          <p className="text-7xl font-bold tracking-tight text-slate-900 sm:text-8xl">
            {formattedMinutes}:{formattedSeconds}
          </p>
        </div>

        {/* Status */}
        <p className="mb-6 text-sm text-slate-500">
          {isRunning
            ? mode === "study"
              ? "Stay focused on your task."
              : "Take a relaxing break."
            : "Timer is paused."}
        </p>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={handleStartPause}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;