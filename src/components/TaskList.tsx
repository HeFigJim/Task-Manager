import { format, parseISO } from "date-fns";
import { ITask } from "../models/ITask";

type ListProps = {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const TaskList = ({ tasks, setTasks }: ListProps) => {
  const handleDelete = (id: string) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };
  return (
    <div className="mx-3">
      <h2 className="fw-bold ">Tasks</h2>
      <div className="row">
        <div className="col-sm">Title</div>
        <div className="col-sm">Due Date</div>
        <div className="col-sm">Category</div>
        <div className="col-sm"> </div>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="row border border-dark ">
          <div className="col-sm my-2">{task.title}</div>
          <div className="col-sm my-2">
            {typeof task.dueDate === "string"
              ? format(parseISO(task.dueDate), "MM/dd/yyyy")
              : format(task.dueDate, "MM/dd/yyyy")}
          </div>
          <div className="col-sm my-2">{task.category}</div>
          <div className="col-sm">
            <button
              className="bg-bg-secondary bg-danger text-bg-primary rounded w-50 my-2 "
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
