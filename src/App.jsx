import React, { useState } from "react";
import Navigation from "./components/Navigation";
import DailyTasks from "./components/DailyTasks";
import ExercisesGuide from "./components/ExercisesGuide";
import ProgressTracker from "./components/ProgressTracker";
import Statistics from "./components/Statistics";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("daily");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "daily":
        return <DailyTasks />;
      case "exercises":
        return <ExercisesGuide />;
      case "progress":
        return <ProgressTracker />;
      case "statistics":
        return <Statistics />;
      default:
        return <DailyTasks />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Лечение заикания</h1>
        <p>Индивидуальная программа терапии</p>
      </header>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="app-main">{renderActiveSection()}</main>
    </div>
  );
}

export default App;
