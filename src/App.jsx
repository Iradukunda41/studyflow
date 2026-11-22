import { BrowserRouter, Routes, Route } from "react-router-dom";

import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import SiteLayout from "./layouts/SiteLayout";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import FocusPage from "./pages/FocusPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [tasks, setTasks] = useLocalStorage(
    "studyflow-tasks",
    initialTasks
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={<DashboardPage tasks={tasks} />}
          />

          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                setTasks={setTasks}
              />
            }
          />

          <Route
            path="/focus"
            element={<FocusPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;