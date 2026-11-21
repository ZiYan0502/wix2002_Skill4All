import React, { useState } from 'react';
import useStudentDashboard from '../../hooks/useStudentDashboard';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const { dashboardData, loading, error } = useStudentDashboard();
  const [activeTab, setActiveTab] = useState('volunteer');
  const [activePage, setActivePage] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  if (loading) {
  return <div className="student-dashboard-loading">Loading dashboard...</div>;
}

if (error) {
  return <div className="student-dashboard-error">{error}</div>;
}

if (!dashboardData) {
  return <div>No dashboard data available.</div>;
}

  const isLearning = activeTab === 'learning';

  const currentData = isLearning
    ? dashboardData.learning
    : dashboardData.volunteer;

  const currentPastProgrammes = currentData.records;
  const currentHours = currentData.hoursByMonth;

  const filteredProgrammes = (currentPastProgrammes || [])
  .filter((programme) =>
    programme.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'hours') return b.hours - a.hours;
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

 const handleQuickAction = (action) => alert(`${action} page will be available soon!`);

  return (
    <div className={`student-dashboard ${isLearning ? 'learning-mode' : 'volunteer-mode'}`}>
      <StudentSidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="student-main-content">
        <StudentNavbar username={dashboardData.profile.username} />

        <div className="student-dashboard-content">
          <div className="student-tab-section">
            <div className="student-tab-switch">
              <button type="button" className={!isLearning ? 'active' : ''} onClick={() => setActiveTab('volunteer')}>Volunteer</button>
              <button type="button" className={isLearning ? 'active' : ''} onClick={() => setActiveTab('learning')}>Learning</button>
            </div>
          </div>

          <div className="student-top-grid">
            <section className="student-progress-card">
              <h2>Progress</h2>
              <div className="student-progress-content">
                <span className="student-ongoing-label">{currentData.ongoingProgramme ? 'ONGOING PROGRAMME' : 'NO PROGRAMME'}</span>
                <span className="student-progress-percentage">{currentData.progress}%</span>
                <div className="student-progress-track">
                  <div className="student-progress-fill" style={{ width: `${currentData.progress}%` }}>
                    <span className="student-progress-knob"></span>
                  </div>
                </div>
              </div>

              <div className={`student-ongoing-details ${isLearning ? 'student-no-programme' : ''}`}>
                {isLearning ? (
                  <>
                    <div className="student-no-programme-avatar" aria-hidden="true">
                      <span className="student-person-head"></span>
                      <span className="student-person-body"></span>
                    </div>
                    <div className="student-ongoing-info">
                      <h3>You haven’t joined any classes</h3>
                      <p>Explore available modules to get started</p>
                    </div>
                    <button type="button" className="student-more-btn" onClick={() => handleQuickAction('Browse Learning Modules')}>More <span className="student-more-chevron"></span></button>
                  </>
                ) : (
                  <>
                    <div className="student-ongoing-avatar">U</div>
                    <div className="student-ongoing-info">
                      <h3>{currentData.ongoingProgramme}</h3>
                      <p>{currentData.organization}</p>
                    </div>
                    <button type="button" className="student-more-btn" onClick={() => handleQuickAction('Programme Details')}>More <span className="student-more-chevron"></span></button>
                  </>
                )}
              </div>
            </section>

            <section className="student-hours-card">
              <h2>{isLearning ? 'Learning Hours' : 'Volunteer Hours'}</h2>
              <div className="student-hours-chart">
               {(currentHours || []).map((item, index) => (
                  <div className="student-hours-column" key={item.month}>
                    <span className="student-hours-value">{item.hours}</span>
                    <div className="student-hours-bar-wrapper">
                      <div className={`student-hours-bar bar-${index + 1}`} style={{ height: `${(item.hours / 20) * 100}%` }} />
                    </div>
                    <small>{item.month}</small>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="student-bottom-grid">
            <section className="student-past-section">
              <div className="student-past-heading">
                <h2>{isLearning ? 'Past Learning' : 'Past Volunteering'}</h2>
                <div className="student-past-tools">
                  <div className="student-search-box">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <span aria-hidden="true">⌕</span>
                  </div>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort programmes" className="student-sort-select">
                    <option value="name">Sort by name</option>
                    <option value="hours">Sort by hours</option>
                    <option value="newest">Sort by newest</option>
                  </select>
                </div>
              </div>

                         <div className="student-past-grid">
                {filteredProgrammes.length > 0 ? filteredProgrammes.map((programme) => (
                  <div className="student-past-card" key={`${activeTab}-${programme.id}`}>
                    <div className="student-past-image">
                      <span className="student-past-illustration">{programme.icon}</span>
                      <span className="student-past-hours">+{programme.hours} Hours</span>
                    </div>
                    <div className="student-past-info">
                      <h3>{programme.name}</h3>
                      <p><span className="student-org-avatar">S</span>{programme.organization}</p>
                    </div>
                  </div>
                )) : <p className="student-no-results">No programmes found.</p>}
              </div>
            </section>

            <section className="student-quick-section">
              <h2>Quick Actions</h2>
              <div className="student-quick-list">
                <button type="button" className="student-quick-card" onClick={() => handleQuickAction('Browse Events')}>
                  <span className="student-quick-icon">▱</span>
                  <span className="student-quick-text"><strong>Browse Events</strong><small>More events info</small></span>
                  <span className="student-quick-arrow">→</span>
                </button>
                <button type="button" className="student-quick-card" onClick={() => handleQuickAction('Add New Friends')}>
                  <span className="student-quick-icon">♧</span>
                  <span className="student-quick-text"><strong>Add new friends</strong><small>Volunteer together</small></span>
                  <span className="student-quick-arrow">→</span>
                </button>
                <button type="button" className="student-quick-card" onClick={() => handleQuickAction('View Feedback')}>
                  <span className="student-quick-icon">▤</span>
                  <span className="student-quick-text"><strong>View Feedback</strong><small>See your event performance</small></span>
                  <span className="student-quick-arrow">→</span>
                </button>
                <button type="button" className="student-quick-card" onClick={() => handleQuickAction('Edit Profile')}>
                  <span className="student-quick-icon">✎</span>
                  <span className="student-quick-text"><strong>Edit Profile</strong><small>Let others get to know you</small></span>
                  <span className="student-quick-arrow">→</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

