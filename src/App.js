import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import UserTable from "./UserTable";
import UserProfile from "./UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
