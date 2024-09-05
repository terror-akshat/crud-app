import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserList } from "./components/UserList";
import { CreateUser } from "./components/create";
import { UserUpdate } from "./components/UserUpdate";

const App: React.FC = () => {
  return (
    //Using routes for redirect the user a/q to there operation perform 
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/UserUpdate/:id" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
