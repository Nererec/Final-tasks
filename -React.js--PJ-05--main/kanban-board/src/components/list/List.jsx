import { useState } from "react";
import { Link } from "react-router-dom";
import { LIST_TYPES } from "../../config";
import FormAddNewTask from "../forms/FormAddNewTask";
import DropDown from "../dropdown/DropDown";
import "./List.css";

const List = ({ type, title, tasks, addNewTask, setTasks, task }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleClick = () => {
    setFormVisible(!isFormVisible);
  };
  const back = tasks.filter((obj) => {
    return obj.status === "backlog";
  });
  const read = tasks.filter((obj) => {
    return obj.status === "ready";
  });
  const inProgress = tasks.filter((obj) => {
    return obj.status === "inProgress";
  });

  return (
    <div className="list">
      <div className="listItem">
        <h2 className="listTitle">{title}</h2>
        {type === LIST_TYPES.FINISHED && (
          <span
            className="listdel"
            onClick={() =>
              setTasks(tasks.filter((task) => task.status !== "finished"))
            }
          >
            X
          </span>
        )}
      </div>
      {task.length ? (
        task.map((task) => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="taskLink">
            <div className="task">{task.title}</div>
          </Link>
        ))
      ) : (
        <p>No tasks added yet</p>
      )}

      {type === LIST_TYPES.BACKLOG && isFormVisible && (
        <FormAddNewTask
          addNewTask={addNewTask}
          setFormVisible={setFormVisible}
        />
      )}

      {type === LIST_TYPES.BACKLOG && (
        <button
          className="addButton"
          onClick={handleClick}
          style={{ display: !isFormVisible ? "block" : "none" }}
        >
          + Add card
        </button>
      )}

      {type === LIST_TYPES.READY && (
        <button
          className={back.length === 0 ? " add" : "addButton"}
          onClick={handleClick}
          disabled={back.length === 0}
          style={{ display: !isFormVisible ? "block" : "none" }}
        >
          + Add card
        </button>
      )}

      {type === LIST_TYPES.IN_PROGRESS && (
        <button
          className={read.length === 0 ? " add" : "addButton"}
          onClick={handleClick}
          disabled={read.length === 0}
          style={{ display: !isFormVisible ? "block" : "none" }}
        >
          + Add card
        </button>
      )}

      {type === LIST_TYPES.FINISHED && (
        <button
          className={inProgress.length === 0 ? " add" : "addButton"}
          onClick={handleClick}
          disabled={inProgress.length === 0}
          style={{ display: !isFormVisible ? "block" : "none" }}
        >
          + Add card
        </button>
      )}

      {type !== LIST_TYPES.BACKLOG && isFormVisible && (
        <DropDown
          type={type}
          tasks={tasks}
          setFormVisible={setFormVisible}
          isFormVisible={isFormVisible}
          addNewTask={addNewTask}
          setTasks={setTasks}
          task={task}
          back={back}
          read={read}
          inProgress={inProgress}
        />
      )}
    </div>
  );
};

export default List;