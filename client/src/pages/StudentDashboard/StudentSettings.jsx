
import React, { useState } from 'react';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import './StudentSettings.css';

export default function StudentSettings() {
  const [activePage, setActivePage] = useState('Settings');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Jia Yen',
    email: '25001234@siswa.um.edu.my',
    matricNo: '25001234',
    phone: '012-345 6789',
    faculty: 'Faculty of Computer Science & Information Technology',
  });

  const [originalProfile, setOriginalProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setOriginalProfile(profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  return (
    <div className="student-settings-page">
      <StudentSidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="student-settings-main">
        <StudentNavbar username={profile.fullName} />

        <div className="student-settings-content">
          <div className="student-settings-card">

            <section className="student-settings-photo">
              <div className="student-settings-avatar">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>

              <button type="button" className="student-change-photo">
                Change Photo
              </button>

              <button type="button" className="student-remove-photo">
                Remove
              </button>
            </section>

            <section className="student-settings-form">
              <div className="student-settings-field">
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="student-settings-field">
                <label>Siswa Mail</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="student-settings-row">
                <div className="student-settings-field">
                  <label>Matric No.</label>
                  <input
                    name="matricNo"
                    value={profile.matricNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="student-settings-field">
                  <label>Phone No.</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="student-settings-field">
                <label>Faculty</label>
                <input
                  name="faculty"
                  value={profile.faculty}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="student-settings-actions">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="student-cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="student-edit-btn"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="student-edit-btn"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
