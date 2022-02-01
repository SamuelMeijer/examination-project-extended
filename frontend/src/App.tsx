import React from "react";
import "./App.css";
//Importing BrowserRouter
import { Navigate, Route, Routes } from "react-router-dom";
// Importing Pages
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";
import NoSuchPage from "./pages/NoSuchPage/NoSuchPage";
// Importing Components
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoSuchPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
