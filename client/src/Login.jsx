import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  // Role selection state
  const [activeRole, setActiveRole] = useState('student'); // 'student' or 'ngo'

  // Independent toggle states for login vs signup
  const [isStudentLogin, setIsStudentLogin] = useState(true);
  const [isNgoLogin, setIsNgoLogin] = useState(true);

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    alert(`Student ${isStudentLogin ? 'Login' : 'Registration'} Submitted`);
  };

  const handleNgoSubmit = (e) => {
    e.preventDefault();
    alert(`NGO ${isNgoLogin ? 'Login' : 'Registration'} Submitted`);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        
        {/* ================= ROLE SELECTOR ================= */}
        <div className="role-selector">
          <button 
            className={`role-btn ${activeRole === 'student' ? 'active-student' : ''}`}
            onClick={() => setActiveRole('student')}
          >
            Student
          </button>
          <button 
            className={`role-btn ${activeRole === 'ngo' ? 'active-ngo' : ''}`}
            onClick={() => setActiveRole('ngo')}
          >
            NGO
          </button>
        </div>

        <div className="cards-wrapper">
          {/* ================= STUDENT CARD ================= */}
          {activeRole === 'student' && (
            <div className="card student-card">
              <div className="card-header">
                <div className="header-icon student-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h2>Student {isStudentLogin ? 'Login' : 'Sign Up'}</h2>
              </div>

              <form onSubmit={handleStudentSubmit} className="login-form">
                {!isStudentLogin && (
                   <div className="input-group">
                    <span className="input-icon">🪪</span>
                     <input type="text" placeholder="Full Name" required />
                   </div>
                )}
                <div className="input-group">
                  <span className="input-icon">👤</span>
                  <input type="text" placeholder="Username" required />
                </div>
                <div className="input-group">
                  <span className="input-icon">🔒</span>
                  <input type="password" placeholder="Password" required />
                </div>
                <button type="submit" className="submit-btn student-btn">
                  {isStudentLogin ? 'Login' : 'Register'} ➔
                </button>
              </form>

              <div className="toggle-container">
                <div className="toggle-bg">
                  <button 
                    className={`toggle-btn ${!isStudentLogin ? 'active' : ''}`}
                    onClick={() => setIsStudentLogin(false)}
                    type="button"
                  >Sign up</button>
                  <button 
                    className={`toggle-btn ${isStudentLogin ? 'active' : ''}`}
                    onClick={() => setIsStudentLogin(true)}
                    type="button"
                  >Login</button>
                </div>
              </div>
            </div>
          )}

          {/* ================= NGO CARD ================= */}
          {activeRole === 'ngo' && (
            <div className="card ngo-card">
              <div className="card-header">
                <div className="header-icon ngo-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <h2>NGO {isNgoLogin ? 'Login' : 'Sign Up'}</h2>
              </div>

              <form onSubmit={handleNgoSubmit} className="login-form">
                {!isNgoLogin && (
                   <div className="input-group">
                    <span className="input-icon">🏢</span>
                     <input type="text" placeholder="Organization Name" required />
                   </div>
                )}
                <div className="input-group ngo-input">
                  <span className="input-icon">👤</span>
                  <input type="text" placeholder="Username" required />
                </div>
                <div className="input-group ngo-input">
                  <span className="input-icon">🔒</span>
                  <input type="password" placeholder="Password" required />
                </div>
                <button type="submit" className="submit-btn ngo-btn">
                  {isNgoLogin ? 'Login' : 'Register'} ➔
                </button>
              </form>

              <div className="toggle-container">
                <div className="toggle-bg">
                  <button 
                    className={`toggle-btn ${!isNgoLogin ? 'active' : ''}`}
                    onClick={() => setIsNgoLogin(false)}
                    type="button"
                  >Sign up</button>
                  <button 
                    className={`toggle-btn ${isNgoLogin ? 'active' : ''}`}
                    onClick={() => setIsNgoLogin(true)}
                    type="button"
                  >Login</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}