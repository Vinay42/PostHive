# PostHive

A responsive full-stack platform for creating, sharing, and exploring image-based posts with titles and content, featuring public/private visibility controls.

## Live Demo

Visit the live application: [PostHive](https://post-hive-lu8b.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

PostHive is a social media platform designed to provide users with a seamless experience for sharing and discovering image-based content. The application focuses on user experience, performance, and security while offering intuitive content management capabilities.

## Features

- **User Authentication**: Secure signup, login, and profile management
- **Post Creation and Management**: Upload images with titles and descriptive content
- **Visibility Controls**: Toggle between public and private posts
- **Content Discovery**: Browse and explore public posts from other users
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Real-time Updates**: Instant feedback on user interactions
- **Image Optimization**: Efficient loading and display of visual content

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication

### Deployment
- Vercel for hosting
- GitHub for version control and collaboration

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas connection)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Vinay42/PostHive.git
cd PostHive
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file with the following variables
PORT=8000
MONGODB_URI=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# In the client directory, create a .env file with the following variables
VITE_API_BASE_URL = http://localhost:8000/api/v1
```

4. Run the application
```bash
# Start the backend server
cd server
npm run dev

# Start the frontend application
cd ../client
npm start
```

## Usage

1. Register a new account or log in with existing credentials
2. Create a new post by clicking on the "Create Post" button
3. Upload an image, add a title and content for your post
4. Choose visibility settings (public/private)
5. Explore other public posts through the discover feed
6. Manage your posts from your profile dashboard

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Post Endpoints
- `GET /api/posts` - Get all public posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### User Endpoints
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Project Structure

```
PostHive/
├── client/                       # Frontend React application
│   ├── public/                   # Static assets (index.html, icons, etc.)
│   ├── src/                      # Source files
│   │   ├── assets/              # Images, icons, etc.
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Route/page-level components
│   │   ├── services/            # Axios or fetch-based API service functions
│   │   ├── utils/               # Utility/helper functions
│   │   ├── App.js               # Root React component
│   │   └── main.jsx / index.js  # Application entry point
│   ├── .env                     # Environment variables for frontend
│   └── package.json             # Frontend project metadata and dependencies
│
├── server/                      # Backend Node.js + Express + MongoDB
│   ├── config/                  # Configuration files (DB, env, etc.)
│   ├── controllers/            # Functions to handle route logic
│   ├── middleware/             # Custom middleware (auth, error handling)
│   ├── models/                 # Mongoose models for MongoDB
│   ├── routes/                 # Express route definitions
│   ├── utils/                  # Helper functions used server-side
│   ├── .env                    # Environment variables for backend
│   ├── index.js                # Server entry point
│   └── package.json            # Backend project metadata and dependencies
│
├── .gitignore                   # Files and directories to ignore in git
├── README.md                    # Project overview and setup instructions
└── package-lock.json            # Lock file (if used for full project)

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



Developed by [Vinay42](https://github.com/Vinay42)
