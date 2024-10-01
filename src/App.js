import './App.css';
import React from 'react';
import About from './components/AboutUs';
import Navbar from './components/Navbar';
import TicTacToe from './components/TicTacToe'; 
import Discription from './components/Discription';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <div className="container my-3">
          <Routes>
            <Route path="/AboutUs" element={<About />} />
            <Route path="/Discription" element={<Discription />} />
            <Route path="/" element={<TicTacToe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
