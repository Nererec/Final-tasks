import { useState } from "react";
import { useMatch, Link } from "react-router-dom";
import "./TaskDetail.css";

const TaskDetail = ({ tasks, setTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  const match = useMatch("tasks/:taskId");
  const { taskId } = match.params;
  const tas = tasks.find((task) => task.id === taskId);

  let elem;
  if (!isEdit) {
    elem = (
      <span
        className="description"
        title="Редактировать"
        onClick={(e) => setIsEdit(true)}
      >
        {tas.description || "This task has no description"}
      </span>
    );
  } else {
    elem = (
      <textarea
        className="area-text"
        name="description"
        value={tas.description}
        onChange={(event) =>
          setTasks(
            tasks.map((task) =>
              task.id === taskId
                ? { ...task, [event.target.name]: event.target.value }
                : task
            )
          )
        }
        onBlur={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="description-wrapper">
      <div className="description-header">
        <h2 className="description-title">{tas.title}</h2>

        <p className="text-area">Description: {elem}</p>
      </div>
      <Link to="/" className="homeLink">
        &#9587;
      </Link>
    </div>
  );
};

export default TaskDetail;
