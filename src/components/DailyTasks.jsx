import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import "./DailyTasks.css";

const defaultTasks = [
  { id: 1, text: "Утренняя артикуляционная гимнастика (5 мин)", completed: false },
  { id: 2, text: "Чтение вслух с замедленным темпом (10 мин)", completed: false },
  { id: 3, text: "Дыхательные упражнения Стрельниковой (2-5 мин)", completed: false },
  { id: 4, text: "Практика речи в зеркале (5 мин)", completed: false },
  { id: 5, text: "Вечернее настраивающие упражнения (5 мин)", completed: false },
];

const DailyTasks = () => {
  const today = new Date().toISOString().split("T")[0];
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`tasks_${today}`);
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem(`tasks_${today}`, JSON.stringify(tasks));
  }, [tasks, today]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="daily-tasks">
      <div className="tasks-header">
        <h2>Ежедневные задания</h2>
        <div className="date-display">{today}</div>
        <div className="progress-info">
          Выполнено: {completedCount}/{totalCount}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="tasks-container">
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Добавить новое задание..."
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Добавить</button>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;
