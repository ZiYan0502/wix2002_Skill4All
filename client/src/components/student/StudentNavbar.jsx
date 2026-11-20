import React from 'react';
import './StudentNavbar.css';

export default function StudentNavbar({ username }) {
  const displayName = username || 'Student';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="student-navbar">

      {/* Welcome */}
      <div className="student-navbar-welcome">
        <h1>Welcome back, {displayName}!</h1>
      </div>

      {/* Right side */}
      <div className="student-navbar-actions">

        {/* Profile */}
        <div className="student-profile">
          <div className="student-profile-avatar">
            {initial}
          </div>

          <span className="student-profile-name">
            {displayName}
          </span>

          <span className="student-profile-arrow"></span>
        </div>

        {/* Notification */}
        <button
          className="student-notification-btn"
          type="button"
          aria-label="Notifications"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span className="student-notification-dot"></span>
        </button>

      </div>
    </header>
  );
}