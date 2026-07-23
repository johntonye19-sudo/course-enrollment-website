import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <FaBook /> NDA Enrollment
        </Link>
        
        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-blue-200 transition">Courses</Link>
          </li>
          
          {user ? (
            <>
              {user.role === 'student' && (
                <li>
                  <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                </li>
              )}
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin" className="hover:text-blue-200 transition">Admin</Link>
                </li>
              )}
              <li className="relative group">
                <button className="flex items-center gap-2 hover:text-blue-200 transition">
                  <FaUser /> {user.firstName}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-blue-200 transition">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;