import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/NgoDashboard/NgoDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard'; 
import StudentProgrammes from './pages/StudentDashboard/StudentProgrammes';
import StudentFriends from './pages/StudentDashboard/StudentFriends';
import StudentSettings from './pages/StudentDashboard/StudentSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/org-dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-programmes" element={<StudentProgrammes />} />
        <Route path="/student-friends" element={<StudentFriends />} />
        <Route path="/student-settings" element={<StudentSettings />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
