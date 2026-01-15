import React from "react";
import "./Navigation.css";

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "daily", label: "Ежедневные задания", icon: "📋" },
    { id: "exercises", label: "Упражнения", icon: "📚" },
    { id: "progress", label: "Прогресс", icon: "📊" },
    { id: "statistics", label: "Статистика", icon: "📈" },
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-button ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
