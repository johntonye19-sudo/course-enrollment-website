import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaFilter } from 'react-icons/fa';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    semester: '',
    level: '',
    department: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let result = courses;
    
    if (filters.semester) {
      result = result.filter(c => c.semester === filters.semester);
    }
    if (filters.level) {
      result = result.filter(c => c.level === filters.level);
    }
    if (filters.department) {
      result = result.filter(c => c.department === filters.department);
    }
    
    setFiltered(result);
  }, [filters, courses]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading courses...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Courses</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-4 mb-4">
          <FaFilter className="text-blue-600" />
          <h2 className="text-xl font-bold">Filter Courses</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="form-group">
            <label className="form-label">Semester</label>
            <select
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Semesters</option>
              <option value="1">First Semester</option>
              <option value="2">Second Semester</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Level</label>
            <select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filtered.map(course => (
          <Link key={course._id} to={`/courses/${course._id}`}>
            <div className="card hover:shadow-lg transition h-full cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{course.code}</h3>
                  <p className="text-gray-600">{course.title}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                  {course.credits} Credits
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Level:</strong> {course.level}</p>
                <p><strong>Semester:</strong> {course.semester}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No courses found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

export default Courses;