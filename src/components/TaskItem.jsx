import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-content">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className="task-text">{task.text}</span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="Удалить задачу">
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
