import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Members from "./components/Members";
import Gallery from "./components/Gallery";
import JoinForm from "./components/JoinForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <About />
      <Members />
      <Gallery />
      <JoinForm />
    </div>
  );
}

export default App;
