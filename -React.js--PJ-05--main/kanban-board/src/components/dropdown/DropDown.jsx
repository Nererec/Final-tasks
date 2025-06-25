import React, { useState } from "react";
import uniqid from "uniqid";
import { LIST_TYPES } from "../../config";
import Arrow from "../../asset/Vector-arrow.svg";
import "./DropDown.css";

const DropDown = ({
  type,
  tasks,
  setTasks,
  setFormVisible,
  back,
  read,
  inProgress,
  isFormVisible,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setIsEdit(true);

    const task = {
      id: uniqid(),
      title: e.target.title,
      description: e.target.getAttribute("data-desc"),
      status: type,
    };

    setTasks([...tasks, task]);
  };

  const remItem = (e) => {
    setTasks(tasks.filter((task) => task.id !== e.target.id));

    setFormVisible(false);
  };

  return (
    <div className="dropdown">
      <div className="arrow">
        <img
          src={Arrow}
          alt="Arrow"
          onClick={() => setFormVisible(!isFormVisible)}
        />
      </div>
      <div className="dropdown-title">
        {type === LIST_TYPES.READY &&
          back.map((title) => {
            return (
              <p
                key={title.id}
                id={title.id}
                title={title.title}
                data-tag={title.status}
                data-des={title.description}
                data-desc="title"
                className="title"
                onClick={(e) => (!isEdit ? onClick(e) : remItem(e))}
              >
                {title.title}
              </p>
            );
          })}

        {type === LIST_TYPES.IN_PROGRESS &&
          read.map((title) => (
            <p
              key={title.id}
              id={title.id}
              title={title.title}
              data-tag={title.status}
              data-desc="description"
              data-des={title.description}
              className="title"
              onClick={(e) => (!isEdit ? onClick(e) : remItem(e))}
            >
              {title.title}
            </p>
          ))}

        {type === LIST_TYPES.FINISHED &&
          inProgress.map((title) => (
            <p
              key={title.id}
              id={title.id}
              title={title.title}
              data-tag={title.status}
              data-desc="description"
              data-des={title.description}
              className="title"
              onClick={(e) => (!isEdit ? onClick(e) : remItem(e))}
            >
              {title.title}
            </p>
          ))}
      </div>
    </div>
  );
};
export default DropDown;
