import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import Scholarships from './pages/student/Scholarships';
import ScholarshipDetail from './pages/student/ScholarshipDetail';
import Bookmarks from './pages/student/Bookmarks';
import MyApplications from './pages/student/MyApplications';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageScholarships from './pages/admin/ManageScholarships';
import ManageUsers from './pages/admin/ManageUsers';
import ManageApplications from './pages/admin/ManageApplications';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Routes>
      {/* Public */}
      <Route path="/login"  element={!user ? <Login />  : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" replace />} />

      {/* Student Routes */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/dashboard"         element={<StudentDashboard />} />
        <Route path="/scholarships"      element={<Scholarships />} />
        <Route path="/scholarships/:id"  element={<ScholarshipDetail />} />
        <Route path="/bookmarks"         element={<Bookmarks />} />
        <Route path="/my-applications"   element={<MyApplications />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin"                    element={<AdminDashboard />} />
        <Route path="/admin/scholarships"       element={<ManageScholarships />} />
        <Route path="/admin/users"              element={<ManageUsers />} />
        <Route path="/admin/applications"       element={<ManageApplications />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={
        !user ? <Navigate to="/login" replace /> :
        user.role === 'admin' ? <Navigate to="/admin" replace /> :
        <Navigate to="/dashboard" replace />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
