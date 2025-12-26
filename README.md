# 🌐 SocioSphere

SocioSphere is a full-stack MERN social media application built with a strong focus on real-time interaction, scalability, and clean UI design.  
The platform enables users to connect with friends, share posts, receive instant notifications, and share live locations securely in real time.

This project demonstrates practical experience with modern web development, real-time systems, and full-stack architecture.

---

## 🚀 Features

### Authentication & Security
- User registration and login using JWT authentication
- Secure password handling
- Protected routes and authorized access

### Social Media Functionality
- Create, like, and delete posts
- View posts from friends
- User profile pages
- Friend list management

### Live Location Sharing (Real-Time)
- Share live location with friends
- View friends’ live locations on an embedded map
- Start and stop location sharing at any time
- Implemented using Socket.IO and the Browser Geolocation API

### Real-Time Notifications
- Instant notifications for user interactions
- Socket.IO based real-time communication

### User Interface
- Responsive design for all screen sizes
- Material UI (MUI) components
- Light and Dark mode support

---

## 🛠 Tech Stack

Frontend:
- React.js
- Redux Toolkit
- Material UI
- Socket.IO Client

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.IO

Tools & Services:
- Git & GitHub
- MongoDB Atlas
- Render for deployment

---

## 📂 Project Structure

mern-social-media  
├── client  
├── server  
├── .vscode  
└── README.md  

---

## ⚙️ Environment Variables

Backend (server/.env):
MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=3001  

Frontend (client/.env):
REACT_APP_API_URL=backend_url  

---

## ▶️ Running the Project Locally

1. Clone the repository:
git clone https://github.com/subhalaxmibarik/Sociosphere.git  

2. Start the backend:
cd server  
npm install  
npm start  

3. Start the frontend:
cd client  
npm install  
npm start  

---

## 🌍 Deployment

- Frontend deployed on Render  
- Backend deployed on Render  
- Database hosted on MongoDB Atlas  

---

## 🎯 Future Improvements

- Real-time chat and messaging
- Location privacy controls
- Friend request notifications
- Enhanced map UI with markers

---

## 👩‍💻 Author

Subhalaxmi Barik  
Aspiring Software Development Engineer  

---

## ⭐ Support

If you like this project, please consider giving it a star on GitHub.