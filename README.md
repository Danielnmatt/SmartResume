# SmartResume

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)

An intelligent resume optimization platform that uses AI to match resumes with job descriptions and provide personalized recommendations.

## Features

- **AI-Powered Resume Analysis**: Leverages Google's Gemini AI to analyze and optimize resumes
- **Job Matching**: Intelligent matching between resumes and job descriptions
- **User Authentication**: Secure signup/login with JWT tokens
- **Resume Upload**: Support for PDF resume uploads and processing
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with modern UI components

## Architecture

This is a full-stack application with:

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **AI Integration**: Google Gemini API
- **Authentication**: JWT with secure cookie storage

## Prerequisites

Before running this application, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v10 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- Google Gemini API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Danielnmatt/SmartResume.git
   cd SmartResume
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd app/backend
   pnpm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd app/frontend/smart-resume
   pnpm install
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `app/backend` directory:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=smartresume
POSTGRES_PORT=5432

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### Database Setup

1. Create a PostgreSQL database named `smartresume`
2. Create the users table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     verification_token VARCHAR(255),
     verification_token_expires_at TIMESTAMP,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Running Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd app/backend
   pnpm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd app/frontend/smart-resume
   pnpm dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the frontend**
   ```bash
   cd app/frontend/smart-resume
   pnpm build
   ```

2. **Start the backend in production mode**
   ```bash
   cd app/backend
   NODE_ENV=production pnpm start
   ```

## Project Structure

```
SmartResume/
├── app/
│   ├── backend/                 # Backend API server
│   │   ├── controllers/         # Route controllers
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utility functions
│   │   ├── server.ts           # Main server file
│   │   └── package.json
│   └── frontend/
│       └── smart-resume/       # React frontend
│           ├── src/
│           │   ├── components/ # React components
│           │   ├── pages/      # Page components
│           │   ├── api/        # API client
│           │   └── styles/     # CSS styles
│           └── package.json
├── package.json                # Root package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### Users
- `GET /users` - Get user information
- Additional user endpoints as needed

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Secure HTTP-only cookies
- CORS protection
- Helmet.js security headers
- Input validation and sanitization

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Future Implementations

- [ ] Docker containerization
- [ ] CI/CD
- [ ] Comprehensive testing
- [ ] Rate limiting
- [ ] Email verification
- [ ] Resume templates
- [ ] Advanced AI recommendations
- [ ] Analytics dashboard

## Support

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development experience
