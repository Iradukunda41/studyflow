import { useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

function FocusPage() {
  useDocumentTitle("Focus | StudyFlow");

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }

        setMinutes((prevMinutes) => {
          if (prevMinutes > 0) {
            return prevMinutes - 1;
          }

          setIsRunning(false);
          return 0;
        });

        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    if (minutes === 0 && seconds === 0) return;

    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (value) => {
    return String(value).padStart(2, "0");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-semibold text-green-600">
          Stay focused
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Focus Session
        </h1>

        <p className="text-gray-500 mt-2">
          Use a focused study session to make progress without distractions.
        </p>
      </div>

      {/* Timer */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center">

        <p className="text-gray-500 font-medium mb-6">
          {isRunning ? "Focus session in progress" : "Ready to focus?"}
        </p>

        <div className="text-7xl sm:text-8xl font-bold text-gray-900 tracking-tight">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {!isRunning ? (
            <button
              onClick={handleStart}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Pause
            </button>
          )}

          <button
            onClick={handleReset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold transition"
          >
            Reset
          </button>

        </div>

      </div>

      {/* Session Information */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-gray-500 text-sm">
            Session
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            25 min
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-gray-500 text-sm">
            Mode
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-1">
            Focus
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-gray-500 text-sm">
            Status
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {isRunning ? "Running" : "Paused"}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default FocusPage;