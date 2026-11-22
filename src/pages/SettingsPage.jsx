import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

function SettingsPage() {
  useDocumentTitle("Settings | StudyFlow");

  const [name, setName] = useState("Student");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-600">
          Customize your experience
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your StudyFlow preferences and account settings.
        </p>
      </div>

      {/* Profile Settings */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update your basic profile information.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
          <div>
            <h3 className="font-semibold text-gray-800">
              Notifications
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Receive study reminders and task notifications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`relative w-12 h-6 rounded-full transition ${
              notifications
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
            aria-label="Toggle notifications"
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                notifications
                  ? "left-7"
                  : "left-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
          <div>
            <h3 className="font-semibold text-gray-800">
              Dark Mode
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Switch between light and dark appearance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-12 h-6 rounded-full transition ${
              darkMode
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                darkMode
                  ? "left-7"
                  : "left-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Save */}
        <div className="border-t border-gray-100 pt-5">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Save Settings
          </button>
        </div>
      </form>

      {/* StudyFlow Information */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-green-900">
          About StudyFlow
        </h2>

        <p className="text-sm text-green-800 mt-2">
          StudyFlow helps students organize tasks, track progress,
          and maintain focused study sessions.
        </p>

        <p className="text-xs text-green-700 mt-4">
          StudyFlow v1.0
        </p>
      </div>

    </div>
  );
}

export default SettingsPage;