import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import React from "react";

const App = () => {
  const initialState = JSON.parse(window.localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="wrapper">
      <Header />
      <Main tasks={tasks} setTasks={setTasks} />
      <Footer tasks={tasks} />
    </div>
  );
};

export default App;