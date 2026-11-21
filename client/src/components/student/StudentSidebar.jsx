
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSidebar.css';
import logoImage from '../../assets/logo.jpeg';
import homeIcon from '../../assets/sidebar-icons/homeIcon.png';
import programIcon from '../../assets/sidebar-icons/programIcon.png';
import friendsIcon from '../../assets/sidebar-icons/friendsIcon.png';
import settingIcon from '../../assets/sidebar-icons/settingIcon.png';
import logoutIcon from '../../assets/sidebar-icons/logoutIcon.png';

export default function StudentSidebar({ activePage = 'Home', onNavigate }) {
  const navigate = useNavigate();

  const menuItems = [
  { name: 'Home', icon: homeIcon },
  { name: 'Programmes', icon: programIcon },
  { name: 'Friends', icon: friendsIcon },
  { name: 'Settings', icon: settingIcon },
];

  const handleMenuClick = (page) => {
  if (onNavigate) {
    onNavigate(page);
  }

  if (page === 'Home') {
    navigate('/student-dashboard');
  } else if (page === 'Programmes') {
    navigate('/student-programmes');
  } else if (page === 'Friends') {
    navigate('/student-friends');
  } else if (page === 'Settings') {
    navigate('/student-settings');
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
            <img 
              src={item.icon}
              alt=""
              className="student-menu-icon"
              />
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
          <img
          src={logoutIcon}
          alt=""
          className="student-menu-icon"
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
