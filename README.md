# Members-Only

A secure authentication-enabled messaging platform where users can sign up, log in, and share messages with other community members. Built with modern web technologies and featuring role-based access control through a unique membership verification system.

**Live Demo:** [https://members-only-production-ec62.up.railway.app/](https://members-only-production-ec62.up.railway.app/)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Security](#security)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure sign-up and login using PassportJS with local strategy
- **Membership System**: Exclusive access to members-only content through a verification challenge
- **Message Board**: Post and view messages in a real-time chat interface
- **Membership Verification**: Answer a calculus question to unlock membership privileges
- **User-specific Actions**: Members can see other members' identities and delete messages
- **Anonymous Access**: Non-members can view messages anonymously
- **Session Management**: Persistent user sessions with secure cookie-based authentication
- **Password Security**: Bcryptjs hashing with strict password validation requirements

## Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **JavaScript/JSX** - Frontend logic and components
- **CSS Modules** - Component-scoped styling
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **PassportJS** - Authentication middleware
- **PostgreSQL** - Relational database
- **Bcryptjs** - Password hashing
- **Express-validator** - Server-side validation
- **Express-session** - Session management

### Deployment
- **Railway.app** - Cloud hosting platform

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/Mikael92002/members-only.git
cd members-only

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client/members-only
npm install

# Return to root directory
cd ../..

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/members_only_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=members_only_db

# Session Configuration
SECRET=your_super_secret_session_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Using the provided start script
./start.sh

# Or manually:
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client/members-only
npm run dev

# Build the frontend
cd client/members-only
npm run build

# Start the server
cd ../../server
NODE_ENV=production npm start
```
# API Documentation

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint   | Description                       |
|--------|------------|-----------------------------------|
| POST   | `/signup`  | Register a new user account       |
| POST   | `/login`   | Authenticate user credentials     |
| GET    | `/logout`  | Terminate user session            |

### User Routes (`/api/user`)

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| GET    | `/`         | Get current authenticated user       |
| PUT    | `/:userID`  | Update user membership status        |

### Message Routes (`/api/messages`)

| Method | Endpoint        | Description                                          |
|--------|-----------------|------------------------------------------------------|
| GET    | `/`             | Get messages (filtered by membership status)         |
| GET    | `/anonymous`    | Get all messages without authentication              |
| POST   | `/:userID`      | Post a new message                                   |
| DELETE | `/:messageID`   | Delete a message (members only)                      |

## Usage Guide

### Creating an Account
1. Navigate to the Sign Up form on the authentication page
2. Enter a username (1-20 characters, no spaces)
3. Create a password meeting these requirements:
   - Minimum 8 characters
   - At least one number
   - At least one special character (!@#$%^&*(),.?":{}|<>)
   - At least one letter
4. Click "Submit" to register

### Logging In
1. Go to the Log In form
2. Enter your username and password
3. Click "Log In" to authenticate

### Becoming a Member
1. After logging in, click the navigation link to access the secret membership page
2. Answer the calculus challenge: `d/dx(cos(x)+sin(x))`
3. Correct answers: `-sin(x)+cos(x)` or `cos(x)-sin(x)`
4. Successfully answer to unlock membership privileges

### Posting Messages
- Logged-in users can post messages in the message board
- Messages are limited to 250 characters
- Press Enter or click "Post" to submit
- Members can see the author of each message and delete messages

### Viewing Messages
- **Anonymous Users**: Can view all messages without revealing authorship
- **Logged-in Users**: Can see message authors and timestamps
- **Members**: Can see all user details and have the ability to delete messages

## Security

This application implements several security measures:

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
- **Input Validation**: Server-side validation of all user inputs using express-validator
- **Session Security**: HTTP-only cookies with secure session management via express-session
- **SQL Injection Prevention**: Parameterized queries through database abstraction
- **CSRF Protection**: Session-based authentication prevents CSRF attacks
- **Password Requirements**: Strong password policy enforcement (minimum 8 characters with mixed character types)
- **Membership Verification**: Additional authentication layer through knowledge-based verification