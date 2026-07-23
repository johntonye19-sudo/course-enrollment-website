import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';

function StudentDashboard({ user }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, [user]);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/enrollments/student/${user.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600';
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card">
          <FaUser className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Name</h3>
          <p className="text-xl font-bold">{user.firstName} {user.lastName}</p>
        </div>
        <div className="card">
          <FaBook className="text-4xl text-green-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Enrollments</h3>
          <p className="text-xl font-bold">{enrollments.length}</p>
        </div>
        <div className="card">
          <FaClock className="text-4xl text-yellow-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Pending</h3>
          <p className="text-xl font-bold">{enrollments.filter(e => e.status === 'pending').length}</p>
        </div>
        <div className="card">
          <FaCheckCircle className="text-4xl text-purple-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Approved</h3>
          <p className="text-xl font-bold">{enrollments.filter(e => e.status === 'approved').length}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Your Enrollments</h2>
        {loading ? (
          <p>Loading...</p>
        ) : enrollments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Semester</th>
                  <th className="text-left py-3 px-4">Courses</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Payment</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(enrollment => (
                  <tr key={enrollment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{enrollment.semester}</td>
                    <td className="py-3 px-4">{enrollment.courses.length}</td>
                    <td className={`py-3 px-4 font-bold ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status.toUpperCase()}
                    </td>
                    <td className="py-3 px-4">{enrollment.paymentStatus}</td>
                    <td className="py-3 px-4">{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No enrollments yet. Start by enrolling in courses.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;