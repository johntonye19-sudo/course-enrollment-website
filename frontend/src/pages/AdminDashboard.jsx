import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const [statsRes, enrollmentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/stats/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(
          `http://localhost:5000/api/admin/enrollments${filter !== 'all' ? `?status=${filter}` : ''}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        )
      ]);
      
      setStats(statsRes.data);
      setEnrollments(enrollmentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveEnrollment = async (enrollmentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/enrollments/${enrollmentId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      fetchData();
    } catch (error) {
      alert('Error approving enrollment');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card">
          <FaUsers className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents || 0}</p>
        </div>
        <div className="card">
          <FaBook className="text-4xl text-green-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">{stats.totalCourses || 0}</p>
        </div>
        <div className="card">
          <FaClock className="text-4xl text-yellow-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Pending</h3>
          <p className="text-3xl font-bold">{stats.pendingEnrollments || 0}</p>
        </div>
        <div className="card">
          <FaCheckCircle className="text-4xl text-purple-600 mb-4" />
          <h3 className="text-gray-600 mb-2">Approved</h3>
          <p className="text-3xl font-bold">{stats.approvedEnrollments || 0}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Enrollment Applications</h2>
          <div className="space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Student Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Courses</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Payment</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(enrollment => (
                  <tr key={enrollment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{enrollment.student.firstName} {enrollment.student.lastName}</td>
                    <td className="py-3 px-4">{enrollment.student.email}</td>
                    <td className="py-3 px-4">{enrollment.courses.length}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded text-white text-sm ${
                        enrollment.status === 'pending' ? 'bg-yellow-600' :
                        enrollment.status === 'approved' ? 'bg-green-600' :
                        'bg-red-600'
                      }`}>
                        {enrollment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{enrollment.paymentStatus}</td>
                    <td className="py-3 px-4">
                      {enrollment.status === 'pending' && (
                        <button
                          onClick={() => approveEnrollment(enrollment._id)}
                          className="btn btn-success text-sm"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;