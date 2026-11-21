
import React, { useState } from 'react';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import './StudentFriends.css';

const mockFriends = [
  { id: 1, name: 'Alex Tan', email: 'alex@siswa.um.edu.my', hours: 12, badges: 5 },
  { id: 2, name: 'Sarah Lee', email: 'sarah@siswa.um.edu.my', hours: 10, badges: 4 },
  { id: 3, name: 'Jason Lim', email: 'jason@siswa.um.edu.my', hours: 8, badges: 3 },
  { id: 4, name: 'Emily Wong', email: 'emily@siswa.um.edu.my', hours: 8, badges: 3 },
  { id: 5, name: 'Daniel Tan', email: 'daniel@siswa.um.edu.my', hours: 7, badges: 2 },
];

export default function StudentFriends() {
  const [activePage, setActivePage] = useState('Friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredFriends = mockFriends
    .filter((friend) =>
      `${friend.name} ${friend.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'hours') {
        return b.hours - a.hours;
      }
      return 0;
    });

  return (
    <div className="student-friends-page">
      <StudentSidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="student-friends-main">
        <StudentNavbar username="Jia Yen" />

        <div className="student-friends-content">
          <h1>Friends & Peers</h1>

          <section className="student-find-friends">
            <h2>Find Friends</h2>

            <input
              type="text"
              placeholder="Search the name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by name</option>
              <option value="hours">Sort by hours</option>
            </select>
          </section>

          <section className="student-my-friends">
            <h2>My Friends</h2>

            <div className="student-friends-list">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <div className="student-friend-card" key={friend.id}>
                    <div className="student-friend-profile">
                      <div className="student-friend-avatar">👤</div>
                      <div>
                        <h3>{friend.name}</h3>
                        <p>{friend.email}</p>
                      </div>
                    </div>

                    <div className="student-friend-stats">
                      <strong>{friend.hours} Volunteer Hours</strong>
                      <span>{friend.badges} badges</span>
                    </div>

                    <button
                      type="button"
                      className="student-send-invitation-btn"
                    >
                      Send invitation
                    </button>
                  </div>
                ))
              ) : (
                <p>No friends found.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
