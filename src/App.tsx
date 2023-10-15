import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { ITask } from "./models/ITask";

function App() {
  const defaultTask: ITask[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );
  const [tasks, setTasks] = useState(defaultTask);

  return (
    <div className="mx-4 ">
      <TaskForm setTasks={setTasks} tasks={tasks} />
      {tasks.length > 0 && <TaskList setTasks={setTasks} tasks={tasks} />}
    </div>
  );
}

export default App;
