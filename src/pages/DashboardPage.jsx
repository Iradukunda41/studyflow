import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function DashboardPage({ tasks }) {
  useDocumentTitle("Dashboard | StudyFlow");

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const recentTasks = [...tasks]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-600">
          Welcome to StudyFlow
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Your Study Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Organize your study tasks, track your progress, and stay focused
          on your learning goals.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {totalTasks}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            All your study tasks
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {completedTasks}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Tasks completed
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingTasks}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Tasks remaining
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Progress
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {completionPercentage}%
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recent Tasks
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your upcoming study tasks
            </p>
          </div>

          <Link
            to="/tasks"
            className="text-green-700 font-semibold hover:text-green-800"
          >
            View all tasks →
          </Link>

        </div>

        <div className="divide-y divide-gray-100">

          {recentTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tasks available.
            </div>
          ) : (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      task.completed
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  ></div>

                  <div>
                    <h3
                      className={`font-semibold ${
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">

                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {task.category}
                      </span>

                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        Due: {task.dueDate || "No date"}
                      </span>

                    </div>
                  </div>

                </div>

                <span
                  className={`text-sm font-semibold ${
                    task.completed
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>

              </div>
            ))
          )}

        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <Link
          to="/tasks"
          className="bg-green-700 hover:bg-green-800 text-white rounded-2xl p-6 transition"
        >
          <h3 className="text-xl font-bold">
            Manage Tasks
          </h3>

          <p className="text-green-100 mt-2">
            Add, complete, filter, and organize your study tasks.
          </p>
        </Link>

        <Link
          to="/focus"
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl p-6 transition"
        >
          <h3 className="text-xl font-bold">
            Start Focus Session
          </h3>

          <p className="text-gray-300 mt-2">
            Start a focused study session and stay productive.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default DashboardPage;