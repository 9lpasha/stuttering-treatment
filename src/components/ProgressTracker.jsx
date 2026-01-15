import React, { useState, useEffect } from "react";
import "./ProgressTracker.css";

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Загрузка данных прогресса из localStorage
    const savedData = localStorage.getItem("progress_data");
    if (savedData) {
      setProgressData(JSON.parse(savedData));
    }
  }, []);

  const addProgressEntry = () => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      date: today,
      fluencyLevel: 5, // от 1 до 10
      confidenceLevel: 5, // от 1 до 10
      notes: "",
    };

    const updatedData = [...progressData, newEntry];
    setProgressData(updatedData);
    localStorage.setItem("progress_data", JSON.stringify(updatedData));
  };

  const updateEntry = (index, field, value) => {
    const updatedData = [...progressData];
    updatedData[index][field] = value;
    setProgressData(updatedData);
    localStorage.setItem("progress_data", JSON.stringify(updatedData));
  };

  const getAverageFluency = () => {
    if (progressData.length === 0) return 0;
    const sum = progressData.reduce((acc, entry) => acc + entry.fluencyLevel, 0);
    return Math.round(sum / progressData.length);
  };

  const getAverageConfidence = () => {
    if (progressData.length === 0) return 0;
    const sum = progressData.reduce((acc, entry) => acc + entry.confidenceLevel, 0);
    return Math.round(sum / progressData.length);
  };

  return (
    <div className="progress-tracker">
      <h2>Отслеживание прогресса</h2>

      <div className="progress-summary">
        <div className="stat-card">
          <h3>Средняя беглость речи</h3>
          <div className="stat-value">{getAverageFluency()}/10</div>
        </div>
        <div className="stat-card">
          <h3>Средний уровень уверенности</h3>
          <div className="stat-value">{getAverageConfidence()}/10</div>
        </div>
        <div className="stat-card">
          <h3>Дней тренировок</h3>
          <div className="stat-value">{progressData.length}</div>
        </div>
      </div>

      <button className="add-entry-btn" onClick={addProgressEntry}>
        + Добавить запись дня
      </button>

      <div className="progress-entries">
        {[...progressData].reverse().map((entry, index) => (
          <div key={entry.date} className="progress-entry">
            <div className="entry-header">
              <h4>{entry.date}</h4>
            </div>

            <div className="entry-fields">
              <div className="field-group">
                <label>Беглость речи (1-10):</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={entry.fluencyLevel}
                  onChange={(e) =>
                    updateEntry(progressData.length - 1 - index, "fluencyLevel", parseInt(e.target.value))
                  }
                />
                <span className="slider-value">{entry.fluencyLevel}</span>
              </div>

              <div className="field-group">
                <label>Уровень уверенности (1-10):</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={entry.confidenceLevel}
                  onChange={(e) =>
                    updateEntry(progressData.length - 1 - index, "confidenceLevel", parseInt(e.target.value))
                  }
                />
                <span className="slider-value">{entry.confidenceLevel}</span>
              </div>

              <div className="field-group">
                <label>Заметки:</label>
                <textarea
                  value={entry.notes}
                  onChange={(e) => updateEntry(progressData.length - 1 - index, "notes", e.target.value)}
                  placeholder="Какие упражнения выполняли? Что получилось хорошо? Какие трудности были?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
