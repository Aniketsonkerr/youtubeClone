# YouTube Clone (MERN Stack)

This project is a YouTube clone application built with the **MERN stack** (MongoDB, Express, React, Node.js). The application mimics the core features of YouTube, such as video streaming, comment functionality, and like/dislike interactions.

## Features

- **Video Streaming**: Watch videos hosted on the platform.
- **Likes/Dislikes**: Users can like or dislike videos.
- **Comments**: Users can add and delete comments on videos.
- **User Authentication**: Login and register using JWT tokens (optional).
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## Setup

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- MongoDB (either local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Aniketsonkerr/youtubeClone.git
cd youtubeClone
```

### 2. Backend Setup (Node.js, Express, MongoDB)

#### Install Dependencies

Go to the `backend` directory and install the necessary dependencies:

```bash
cd backend
npm install
```

#### Environment Configuration

Create a `.env` file inside the `backend` directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key (if you have user authentication)
```

#### Start the Backend Server

```bash
npm start
```

The backend will run on `http://localhost:5000`.

---

### 3. Frontend Setup (React)

#### Install Dependencies

Go to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

#### Start the Frontend Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

---

## Usage

### Viewing Videos

Navigate to the home page to see a list of available videos. Clicking on any video will redirect you to the video page, where you can watch the video, like/dislike it, and add comments.

### Liking/Disliking a Video

On the video page, you can click the **Like** or **Dislike** buttons to increase the like/dislike counts.

### Commenting

Users can add comments by typing a message and clicking the **Add Comment** button. They can also delete their comments.

---

## API Endpoints (Backend)

- **GET /api/videos**: Fetch all videos.
- **POST /api/videos**: Upload a new video.
- **POST /api/video/:id/like**: Like a video.
- **POST /api/video/:id/dislike**: Dislike a video.
- **GET /api/comments/:videoId**: Fetch comments for a specific video.
- **POST /api/comment**: Add a comment.
- **DELETE /api/comment/:id**: Delete a comment.

---

## Project Structure

```
youtubeClone/
│
├── backend/                # Backend API (Node.js + Express)
│   ├── models/             # MongoDB models (Video, Comment)
│   ├── controllers/        # API logic
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   └── server.js           # Express server setup
│
├── frontend/               # React frontend
│   ├── src/                # React components and hooks
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project setup and usage instructions
```

---

## Technologies Used

- **Frontend**: React, Redux (if used), TailwindCSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication (optional)**: JWT for secure user login
- **Deployment**: (Optional) Deploy on platforms like Heroku, Vercel, or Netlify.
