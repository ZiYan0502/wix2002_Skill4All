
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSidebar.css';
import logoImage from '../../assets/logo.jpeg';

export default function StudentSidebar({ activePage = 'Home', onNavigate }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'Programmes', icon: '📁' },
    { name: 'Friends', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const handleMenuClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }

    // Only Home has a page route at the moment.
    if (page === 'Home') {
      navigate('/student-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <aside className="student-sidebar">
      <div className="student-sidebar-logo">
        <img
         src={logoImage}
         alt="Skill4All Logo"
         className="student-logo-image"
         />
        <span>Skill4All</span>
      </div>

      <nav className="student-sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`student-menu-btn ${
              activePage === item.name ? 'active' : ''
            }`}
            onClick={() => handleMenuClick(item.name)}
            type="button"
          >
            <span className="student-menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="student-sidebar-bottom">
        <button
          className="student-menu-btn student-logout-btn"
          onClick={handleLogout}
          type="button"
        >
          <span className="student-menu-icon">⇥</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
