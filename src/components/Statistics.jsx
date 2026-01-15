import React, { useEffect, useState } from "react";
import "./Statistics.css";

const Statistics = () => {
  const [stats, setStats] = useState({
    totalDays: 0,
    completedTasks: 0,
    averageFluency: 0,
    averageConfidence: 0,
    streak: 0,
  });

  useEffect(() => {
    calculateStatistics();
  }, []);

  const calculateStatistics = () => {
    // Подсчет дней с заданиями
    const taskKeys = Object.keys(localStorage).filter((key) => key.startsWith("tasks_"));
    const totalDays = taskKeys.length;

    // Подсчет выполненных задач
    let completedTasks = 0;
    taskKeys.forEach((key) => {
      const tasks = JSON.parse(localStorage.getItem(key) || "[]");
      completedTasks += tasks.filter((task) => task.completed).length;
    });

    // Подсчет прогресса
    const progressData = JSON.parse(localStorage.getItem("progress_data") || "[]");
    const averageFluency =
      progressData.length > 0
        ? Math.round(progressData.reduce((sum, entry) => sum + entry.fluencyLevel, 0) / progressData.length)
        : 0;
    const averageConfidence =
      progressData.length > 0
        ? Math.round(progressData.reduce((sum, entry) => sum + entry.confidenceLevel, 0) / progressData.length)
        : 0;

    // Расчет стрика (подряд идущих дней)
    const streak = calculateStreak();

    setStats({
      totalDays,
      completedTasks,
      averageFluency,
      averageConfidence,
      streak,
    });
  };

  const calculateStreak = () => {
    const taskKeys = Object.keys(localStorage).filter((key) => key.startsWith("tasks_"));
    if (taskKeys.length === 0) return 0;

    // Сортируем даты
    const dates = taskKeys
      .map((key) => key.replace("tasks_", ""))
      .sort()
      .reverse(); // от новых к старым

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

      if (diffDays === i) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getMotivationalMessage = () => {
    if (stats.streak >= 7) {
      return "Отличная работа! Вы на правильном пути к успеху! 🎉";
    } else if (stats.streak >= 3) {
      return "Хороший прогресс! Продолжайте в том же духе! 💪";
    } else {
      return "Каждый день важен! Не сдавайтесь! 🌟";
    }
  };

  return (
    <div className="statistics">
      <h2>Статистика</h2>

      <div className="motivation-banner">
        <p>{getMotivationalMessage()}</p>
        <div className="streak-display">🔥 Текущий стрик: {stats.streak} дней</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-number">{stats.totalDays}</div>
          <div className="stat-label">Дней тренировок</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{stats.completedTasks}</div>
          <div className="stat-label">Выполненных заданий</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-number">{stats.averageFluency}/10</div>
          <div className="stat-label">Средняя беглость</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-number">{stats.averageConfidence}/10</div>
          <div className="stat-label">Средняя уверенность</div>
        </div>
      </div>

      <div className="achievements">
        <h3>Достижения</h3>
        <div className="achievements-list">
          {stats.totalDays >= 1 && (
            <div className="achievement unlocked">
              <span className="achievement-icon">🥇</span>
              <span>Первый день</span>
            </div>
          )}
          {stats.totalDays >= 7 && (
            <div className="achievement unlocked">
              <span className="achievement-icon">🏆</span>
              <span>Недельный марафон</span>
            </div>
          )}
          {stats.totalDays >= 30 && (
            <div className="achievement unlocked">
              <span className="achievement-icon">👑</span>
              <span>Месячная дисциплина</span>
            </div>
          )}
          {stats.streak >= 5 && (
            <div className="achievement unlocked">
              <span className="achievement-icon">🔥</span>
              <span>Пять подряд!</span>
            </div>
          )}
          {stats.completedTasks >= 100 && (
            <div className="achievement unlocked">
              <span className="achievement-icon">🎯</span>
              <span>Сотня выполненных задач</span>
            </div>
          )}
        </div>
      </div>

      <div className="tips-section">
        <h3>Советы для продолжения</h3>
        <ul>
          <li>Выполняйте хотя бы одно задание каждый день</li>
          <li>Записывайте свой прогресс регулярно</li>
          <li>Не пропускайте более двух дней подряд</li>
          <li>Отмечайте даже маленькие победы</li>
          <li>Используйте напоминания для ежедневных практик</li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
