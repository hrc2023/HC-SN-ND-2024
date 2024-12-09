import React, { useEffect } from 'react';
import { checkHealth } from './services/api';
import { AxiosResponse } from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    checkHealth()
        .then((response: AxiosResponse<{ message: string }>) => {
            console.log(response.data.message);
        })
        .catch((error: any) => {
            console.error('Error:', error);
        });
}, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
