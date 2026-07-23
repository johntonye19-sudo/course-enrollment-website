import { Link } from 'react-router-dom';
import { FaBook, FaClipboardCheck, FaCreditCard, FaChartBar } from 'react-icons/fa';

function Home() {
  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Course Enrollment System</h1>
          <p className="text-xl mb-8">Nigerian Defence Academy - Online Course Registration Portal</p>
          <div className="space-x-4">
            <Link to="/courses" className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100 inline-block">
              Browse Courses
            </Link>
            <Link to="/register" className="btn btn-secondary bg-blue-500 text-white hover:bg-blue-700 inline-block">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="card text-center">
              <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Course Catalog</h3>
              <p className="text-gray-600">Browse and select from hundreds of courses across all departments</p>
            </div>
            <div className="card text-center">
              <FaClipboardCheck className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Enrollment</h3>
              <p className="text-gray-600">Simple step-by-step enrollment process with form validation</p>
            </div>
            <div className="card text-center">
              <FaCreditCard className="text-4xl text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options for course fees and registration</p>
            </div>
            <div className="card text-center">
              <FaChartBar className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your enrollment status and academic progress</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Register', desc: 'Create your account with your email' },
              { step: 2, title: 'Browse Courses', desc: 'Explore available courses and departments' },
              { step: 3, title: 'Enroll', desc: 'Select and submit your course preferences' },
              { step: 4, title: 'Pay & Complete', desc: 'Complete payment and finalize enrollment' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
          <p className="text-lg mb-8">Join thousands of students in managing their course enrollments</p>
          <Link to="/register" className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100 inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;