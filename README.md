# Course Enrollment Website

A comprehensive course enrollment platform for educational institutions with student and admin management features.

## Features

### Student Portal
- User authentication & registration
- Profile management
- Course catalog with search & filtering
- Course enrollment & cart management
- Application status tracking
- Document upload
- Payment integration
- Notifications & messaging

### Admin Dashboard
- Application management & approval
- Course management
- Analytics & reporting
- Bulk operations
- User management

## Tech Stack

**Frontend:**
- React 18+
- Tailwind CSS
- Redux/Context API for state management
- Axios for API calls

**Backend:**
- Node.js + Express
- MongoDB
- JWT authentication
- Bcrypt for password encryption

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Quick Start with Docker
```bash
git clone https://github.com/johntonye19-sudo/course-enrollment-website.git
cd course-enrollment-website
docker-compose up
```

### Manual Installation

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
course-enrollment-website/
├── frontend/                 # React application
├── backend/                  # Express API
├── docker-compose.yml
└── README.md
```

## License

MIT License