import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8 text-center">Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/courses')}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back to Courses
      </button>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="card">
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{course.code}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Credits</h3>
                <p className="text-lg text-blue-600">{course.credits}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Department</h3>
                <p className="text-lg">{course.department}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Level</h3>
                <p className="text-lg">{course.level}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Semester</h3>
                <p className="text-lg">Semester {course.semester}</p>
              </div>
            </div>

            {course.schedule && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Schedule</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="mb-2"><strong>Day:</strong> {course.schedule.day}</p>
                  <p className="mb-2"><strong>Time:</strong> {course.schedule.time}</p>
                  <p><strong>Location:</strong> {course.schedule.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Enroll Now</h2>
            <div className="mb-6 space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Current Enrollment</p>
                <p className="text-2xl font-bold">{course.currentEnrollment}/{course.maxCapacity}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Spots Available</p>
                <p className="text-2xl font-bold text-green-600">{course.maxCapacity - course.currentEnrollment}</p>
              </div>
            </div>
            <button className="btn btn-primary w-full mb-3">
              Add to Cart
            </button>
            <button className="btn btn-secondary w-full">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;