
import { useMemo, useState } from "react";

function TasksPage({ tasks, setTasks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    category: "General",
    dueDate: "",
    priority: "Medium",
  });

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      category: newTask.category,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);

    setNewTask({
      title: "",
      category: "General",
      dueDate: "",
      priority: "Medium",
    });

    setShowForm(false);
  };

  // Toggle task completion
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    result = result.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === "completed") {
      result = result.filter((task) => task.completed);
    } else if (filterStatus === "pending") {
      result = result.filter((task) => !task.completed);
    }

    if (filterCategory !== "all") {
      result = result.filter(
        (task) => task.category === filterCategory
      );
    }

    result.sort((a, b) => {
      if (sortBy === "dueDate") {
        return (a.dueDate || "9999-12-31").localeCompare(
          b.dueDate || "9999-12-31"
        );
      }

      if (sortBy === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          (priorityOrder[a.priority] || 4) -
          (priorityOrder[b.priority] || 4)
        );
      }

      return a.title.localeCompare(b.title);
    });

    return result;
  }, [
    tasks,
    searchTerm,
    filterStatus,
    filterCategory,
    sortBy,
  ]);

  const categories = [
    ...new Set(tasks.map((task) => task.category)),
  ];

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-green-600 font-semibold">
            Stay organized
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            My Tasks
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your assignments and track your progress.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          {showForm ? "Cancel" : "+ Add New Task"}
        </button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingTasks}
          </h2>
        </div>

      </div>

      {/* Add Task Form */}
      {showForm && (
        <form
          onSubmit={handleAddTask}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-800">
            Create New Task
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Task Title
            </label>

            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
              placeholder="Enter task title"
              required
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    category: e.target.value,
                  })
                }
                className="w-full border border-gray-200 rounded-xl p-3"
              >
                <option value="General">General</option>
                <option value="Programming">Programming</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Assignment">Assignment</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Due Date
              </label>

              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    dueDate: e.target.value,
                  })
                }
                className="w-full border border-gray-200 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Priority
              </label>

              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value,
                  })
                }
                className="w-full border border-gray-200 rounded-xl p-3"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Save Task
          </button>
        </form>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-xl p-3"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-xl p-3"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl p-3"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>

        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">

        <h2 className="text-xl font-bold text-gray-800">
          Your Tasks ({filteredTasks.length})
        </h2>

        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
            <p className="text-gray-500">
              No tasks found. Try changing your filters or add a new task.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 mt-1 accent-green-700"
                />

                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">

                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {task.category}
                    </span>

                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      Due: {task.dueDate || "No date"}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority} Priority
                    </span>

                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`text-sm font-medium ${
                    task.completed
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TasksPage;
