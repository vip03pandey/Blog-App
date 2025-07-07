```
BlogApp

A full-stack blogging platform where users can write, publish, and explore articles.
Built with a modern React frontend and a Node.js/Express/MongoDB backend.


Features
📝 Write & Publish Articles: Rich editor with image upload and AI-powered title suggestions.
🖼️ Image Upload: Upload featured images for your articles.
🔒 Authentication: Secure user registration and login.
👤 User Profiles: View and manage your profile and articles.
📰 Feed & Pagination: Browse latest stories with pagination and filtering.
📈 Dashboard: User dashboard for managing posts.
🎨 Modern UI: Responsive, clean, and visually appealing design.
```

```
Tech Stack
Frontend: React, Vite, Axios, Tailwind CSS, React Router
Backend: Node.js, Express, MongoDB, Mongoose
Other: Cloudinary (for image uploads), JWT (for authentication), Sonner (for notifications)
```

```
BlogApp/
  blog/
    backend/         # Express API, MongoDB models, routes, middleware
    frontend/        # React app, components, pages, assets
```
```
Backend Setup
     npm install
    MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret


   nodemon server.js
```

```
Usage
Register a new account or log in.
Write and publish articles with images.
Browse, read, and interact with posts.
Manage your profile and dashboard.

```
