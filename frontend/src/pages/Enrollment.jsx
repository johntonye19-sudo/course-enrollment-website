import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';

function Enrollment({ user }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    semester: '',
    academicYear: '',
    documents: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const addToCart = (course) => {
    if (!cart.find(c => c._id === course._id)) {
      setCart([...cart, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(c => c._id !== courseId));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.semester || !formData.academicYear || cart.length === 0) {
      alert('Please fill all fields and select at least one course');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/enrollments',
        {
          student: user.id,
          courses: cart.map(c => c._id),
          semester: formData.semester,
          academicYear: formData.academicYear
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      alert('Enrollment submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error submitting enrollment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalCredits = cart.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Course Enrollment</h1>

      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex-1 flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {currentStep > step ? <FaCheckCircle /> : step}
            </div>
            {step < 4 && <div className={`flex-1 h-1 mx-2 ${
              currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
            }`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {currentStep === 1 && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Step 1: Select Semester & Year</h2>
              <div className="form-group">
                <label className="form-label">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleFormChange}
                  className="form-input"
                >
                  <option value="">Choose a semester</option>
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Academic Year</label>
                <input
                  type="text"
                  name="academicYear"
                  placeholder="e.g., 2023/2024"
                  value={formData.academicYear}
                  onChange={handleFormChange}
                  className="form-input"
                />
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="btn btn-primary w-full"
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Step 2: Select Courses</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {courses.filter(c => 
                  (!formData.semester || c.semester === formData.semester) &&
                  (!formData.academicYear || c.academicYear === formData.academicYear)
                ).map(course => (
                  <div key={course._id} className="border p-4 rounded flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{course.code} - {course.title}</h3>
                      <p className="text-gray-600 text-sm">{course.credits} credits</p>
                    </div>
                    <button
                      onClick={() => addToCart(course)}
                      disabled={cart.find(c => c._id === course._id)}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {cart.find(c => c._id === course._id) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => cart.length > 0 && setCurrentStep(3)}
                  disabled={cart.length === 0}
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Step 3: Review & Upload Documents</h2>
              <p className="text-gray-600 mb-4">Please upload any required documents</p>
              <div className="form-group">
                <label className="form-label">Upload Documents (PDF/Image)</label>
                <input type="file" multiple className="form-input" />
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary flex-1"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Step 4: Confirm & Pay</h2>
              <p className="text-gray-600 mb-4">Review your enrollment details and complete payment</p>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-success w-full mb-3"
              >
                {loading ? 'Processing...' : 'Complete Enrollment & Pay'}
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="btn btn-secondary w-full"
              >
                Back
              </button>
            </div>
          )}
        </div>

        <div className="card sticky top-8 h-fit">
          <h2 className="text-xl font-bold mb-4">Enrollment Cart</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {cart.map(course => (
              <div key={course._id} className="flex justify-between items-start border-b pb-3">
                <div>
                  <p className="font-bold text-sm">{course.code}</p>
                  <p className="text-gray-600 text-xs">{course.credits} credits</p>
                </div>
                <button
                  onClick={() => removeFromCart(course._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-3">
              <span>Total Courses:</span>
              <span className="font-bold">{cart.length}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Total Credits:</span>
              <span className="font-bold text-lg text-blue-600">{totalCredits}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrollment;