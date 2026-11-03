// StudentDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from './assets/logo.jpeg';
import './Dashboard.css';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // 清除登录状态
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImage} alt="Logo" className="logo-icon" />
          <span className="logo-text">Skill4All</span>
        </div>
        <div className="sidebar-bottom">
          <button className="menu-btn logout-btn" onClick={handleLogout}>🚪</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-navbar">
          <h1>Welcome, Student!</h1>
        </header>
        <div className="dashboard-body">
          <h2>Student Portal</h2>
          <p>Here you can view available volunteer activities and learning classes.</p>
          {/* 这里可以放置学生看到的活动列表、已报名的课程等 */}
        </div>
      </main>
    </div>
  );
}