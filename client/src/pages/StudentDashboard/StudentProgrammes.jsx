
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import './StudentProgrammes.css';

export default function StudentProgrammes() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Programmes');

  return (
    <div className="student-programmes-page">
      <StudentSidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="student-programmes-main">
        <StudentNavbar username="Jia Yen" />

        <div className="student-programmes-content">
          <h1>Browse Events</h1>
          <p>Explore programmes and activities uploaded by NGOs.</p>
        </div>
      </main>
    </div>
  );
}
