import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../assets/logo.jpeg";;
import './NgoDashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  // 权限保护：非 NGO 身份拦截
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'student') {
      navigate('/student-dashboard', { replace: true });
    } else if (!role) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState('Organization Admin');
  const [profilePic, setProfilePic] = useState(null);

  // 编辑卡片的状态 (Modal)
  const [editingCard, setEditingCard] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Volunteer');
  const [editImage, setEditImage] = useState(null);
  const [editDetails, setEditDetails] = useState('');

  // 1. 卡片数据 State
  const [cards, setCards] = useState([
    { 
      id: 1, 
      title: "BIM Class", 
      category: "Volunteer", 
      emoji: "🤟", 
      image: null, 
      bgColor: "#b4d3b6",
      details: "Teach sign language basics to volunteers and help building inclusive communities."
    },
    { 
      id: 2, 
      title: "Blood Donation", 
      category: "Learning", 
      emoji: "🩸", 
      image: null, 
      bgColor: "#7bb591",
      details: "Join our annual campus blood donation drive. Health awareness talk will be included."
    },
    { 
      id: 3, 
      title: "First Aid Training", 
      category: "Learning", 
      emoji: "⛑️", 
      image: null, 
      bgColor: "#69a78d",
      details: "Learn essential CPR and emergency response techniques with certified trainers."
    },
    { 
      id: 4, 
      title: "Gotong-royong", 
      category: "Volunteer", 
      emoji: "🧹", 
      image: null, 
      bgColor: "#5d8a66",
      details: "Community cleanup event to promote hygiene and teamwork."
    }
  ]);

  // 2. 名单列表 State
  const [attendees, setAttendees] = useState([
    { id: 1, name: "Jing Zhi", contact: "012-345 6789", hours: 10 },
    { id: 2, name: "Pei Shing", contact: "012-345 6789", hours: 10 },
    { id: 3, name: "Bryant", contact: "012-345 6789", hours: 10 },
    { id: 4, name: "Zi Yan", contact: "012-345 6789", hours: 10 },
    { id: 5, name: "Lee Han", contact: "012-345 6789", hours: 10 }
  ]);

  // 名单：添加新成员
  const handleAddAttendee = () => {
    const name = prompt("Enter Attendee Name:");
    if (!name || !name.trim()) return;

    const contact = prompt("Enter Contact Number:", "012-345 6789") || "012-345 6789";
    const hours = prompt("Enter Hours:", "10") || 10;

    const newAttendee = {
      id: Date.now(),
      name: name.trim(),
      contact: contact.trim(),
      hours: Number(hours)
    };

    setAttendees([...attendees, newAttendee]);
  };

  // 名单：删除成员
  const handleDeleteAttendee = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the list?`)) {
      setAttendees(attendees.filter(person => person.id !== id));
    }
  };

  // 卡片：添加新帖子
  const handleAddPost = (categoryType) => {
    const titleInput = prompt(`Enter ${categoryType} Title:`);
    if (!titleInput || titleInput.trim() === '') return;

    const bgColors = ["#b4d3b6", "#7bb591", "#69a78d", "#5d8a66", "#81c784"];
    const emojis = categoryType === "Volunteer" ? ["🤝", "🙋‍♂️", "🌟", "🤟"] : ["📚", "🎓", "✏️", "💡"];
    
    const newPost = {
      id: Date.now(),
      title: titleInput,
      category: categoryType,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      image: null,
      bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      details: "No details provided yet."
    };

    setCards([...cards, newPost]);
    setIsCreateOpen(false);
  };

  // 卡片：打开 Edit 弹窗
  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setEditTitle(card.title);
    setEditCategory(card.category || 'Volunteer');
    setEditImage(card.image || null);
    setEditDetails(card.details || '');
  };

  // 卡片：编辑弹窗上传图片
  const handleCardImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditImage(imageUrl);
    }
  };

  // 卡片：保存编辑
  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    setCards(cards.map(c => c.id === editingCard.id ? { 
      ...c, 
      title: editTitle, 
      category: editCategory,
      image: editImage,
      details: editDetails
    } : c));
    setEditingCard(null);
  };

  // 卡片：在 Edit 中删除
  const handleDeleteFromEdit = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setCards(cards.filter(c => c.id !== editingCard.id));
      setEditingCard(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login'); 
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImage} alt="Skill4All Logo" className="logo-icon" />
          <span className="logo-text">Skill4All</span>
        </div>
        <nav className="sidebar-menu">
          <button className="menu-btn">☰</button>
          <button 
            className={`menu-btn ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            🏠
          </button>
          <button className="menu-btn">📁</button>
          <button className="menu-btn">👥</button>
          <button 
            className={`menu-btn ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            ⚙️
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="menu-btn logout-btn" onClick={handleLogout}>🚪</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-navbar">
          <h1>{activeTab === 'settings' ? 'Settings' : `Welcome back, ${userName}`}</h1>
          <div className="navbar-right">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="user-profile">
              <div className="avatar">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="profile-img" />
                ) : (
                  "🧑‍💼"
                )}
              </div>
              
              <div className="user-info">
                <span className="user-name">{userName}</span>
                <span className="user-role">NGO Admin</span>
              </div>
              <span className="dropdown-arrow">⌄</span>
            </div>
            
            <button className="notification-btn">🔔</button>
          </div>
        </header>

        <div className="dashboard-body">
          {activeTab === 'dashboard' && (
            <>
              {/* ACTIONS ROW */}
              <div className="actions-row">
                <button className="sort-btn">⇅ Sort by name ⌄</button>
                <div className="create-post-wrapper">
                  <button 
                    className="create-btn"
                    onClick={() => setIsCreateOpen(!isCreateOpen)}
                  >
                    Create Post {isCreateOpen ? '⌃' : '⌄'}
                  </button>
                  {isCreateOpen && (
                    <div className="create-dropdown">
                      <div className="dropdown-header">Post</div>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleAddPost('Volunteer')}
                      >
                        1. Find Volunteer ➔
                      </button>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleAddPost('Learning')}
                      >
                        2. Learning Class ➔
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CARDS CAROUSEL */}
              <div className="cards-carousel">
                <button className="carousel-arrow left">〈</button>
                <div className="cards-track">
                  {cards.map((card) => (
                    <div className="program-card" key={card.id}>
                      <div 
                        className="card-image-area" 
                        style={{ backgroundColor: card.bgColor, cursor: 'pointer' }}
                        onClick={() => handleOpenEdit(card)}
                      >
                        {card.image ? (
                          <img 
                            src={card.image} 
                            alt={card.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <span className="card-emoji">{card.emoji}</span>
                        )}
                      </div>
                      <div className="card-info-area">
                        <h3 onClick={() => handleOpenEdit(card)} style={{ cursor: 'pointer' }}>{card.title}</h3>
                        <p>{card.category}</p>
                        {/* 将按钮文字修改回简短的 Edit */}
                        <button className="edit-btn" onClick={() => handleOpenEdit(card)}>
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-arrow right">〉</button>
              </div>

              {/* ATTENDANCE TABLE SECTION */}
              <div className="table-section">
                <div className="table-header-row">
                  <div className="table-title">
                    <h2>First Aid Training</h2>
                    <span className="table-subtitle">(Learning)</span>
                  </div>
                  <div className="table-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                      onClick={handleAddAttendee}
                      style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      + Add Name
                    </button>
                    <div className="search-bar small-search">
                      <input type="text" placeholder="Search..." />
                      <span className="search-icon">🔍</span>
                    </div>
                    <button className="sort-btn">⇅ Sort by name ⌄</button>
                  </div>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>CONTACT</th>
                        <th>HOURS</th>
                        <th>ATTENDANCE</th>
                        <th style={{ textAlign: 'center' }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendees.map((person) => (
                        <tr key={person.id}>
                          <td className="name-cell">
                            <input type="checkbox" />
                            <div className="avatar small-avatar">🧑‍💼</div>
                            <span>{person.name}</span>
                          </td>
                          <td>{person.contact}</td>
                          <td>{person.hours}</td>
                          <td className="attendance-cell">
                            <button className="attend-btn present">✔️</button>
                            <button className="attend-btn absent">✖</button>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button 
                              onClick={() => handleDeleteAttendee(person.id, person.name)}
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                opacity: 0.7
                              }}
                              title="Delete Person"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="settings-card">
                <h2>Edit Profile</h2>
                <div className="settings-field">
                  <label className="field-label">Profile Picture</label>
                  <label className="avatar settings-avatar" title="Click to upload">
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleProfilePicUpload}
                      onClick={(e) => { e.target.value = null }} 
                    />
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="profile-img" />
                    ) : (
                      <span className="placeholder-icon">🧑‍💼</span>
                    )}
                    <div className="avatar-hover-overlay">Upload</div>
                  </label>
                </div>

                <div className="settings-field">
                  <label className="field-label">Full Name</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= EDIT & DETAILS MODAL ================= */}
      {editingCard && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white', padding: '24px', borderRadius: '12px',
            width: '360px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxHeight: '85vh', overflowY: 'auto'
          }}>
            <h3 style={{ marginTop: 0 }}>Post Details & Edit</h3>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Post Title
              </label>
              <input 
                type="text" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: '100%', padding: '8px', borderRadius: '6px',
                  border: '1px solid #ccc', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Category
              </label>
              <select 
                value={editCategory} 
                onChange={(e) => setEditCategory(e.target.value)}
                style={{
                  width: '100%', padding: '8px', borderRadius: '6px',
                  border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white'
                }}
              >
                <option value="Volunteer">Volunteer</option>
                <option value="Learning">Learning</option>
              </select>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Post Details / Description
              </label>
              <textarea 
                rows="4"
                value={editDetails} 
                onChange={(e) => setEditDetails(e.target.value)}
                placeholder="Enter event description..."
                style={{
                  width: '100%', padding: '8px', borderRadius: '6px',
                  border: '1px solid #ccc', boxSizing: 'border-box',
                  fontFamily: 'inherit', resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Post Image
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}>
                  {editImage ? (
                    <img src={editImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '20px' }}>{editingCard.emoji}</span>
                  )}
                </div>
                <label style={{
                  backgroundColor: '#f0f2f5', padding: '6px 12px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '12px', border: '1px solid #d9d9d9'
                }}>
                  Upload New Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleCardImageUpload}
                  />
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button 
                onClick={handleDeleteFromEdit}
                style={{
                  backgroundColor: '#ff4d4f', color: 'white', border: 'none',
                  padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'
                }}
              >
                Delete
              </button>

              <div>
                <button 
                  onClick={() => setEditingCard(null)}
                  style={{
                    backgroundColor: '#e0e0e0', color: '#333', border: 'none',
                    padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '8px'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  style={{
                    backgroundColor: '#4caf50', color: 'white', border: 'none',
                    padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}