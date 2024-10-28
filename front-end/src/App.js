import React from "react";
import "./App.css";
import "./index.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
