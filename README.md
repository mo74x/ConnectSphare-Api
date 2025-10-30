# ConnectSphere API 🌐

A robust backend API for a social media application built with **Node.js, Express, and MongoDB**. This project provides a complete foundation for features like user authentication, content creation, social interactions (following, liking, commenting), and a personalized content feed.

---

## ## Features ✨

* **JWT Authentication**: Secure user registration and login using JSON Web Tokens.
* **User Profiles**: Functionality for users to have public profiles.
* **Follow System**: Users can follow and unfollow other users.
* **Post Management**: Full CRUD (Create, Read, Delete) operations for posts.
* **Interaction System**: Users can like/unlike posts and comment on them.
* **Personalized Feed**: A dedicated endpoint that provides a feed of posts from followed users, sorted chronologically.
* **MVC Architecture**: Clean and scalable project structure following the Model-View-Controller pattern.

---

## ## Tech Stack 🛠️

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (`jsonwebtoken`)
* **Security**: Password Hashing (`bcryptjs`)
* **Environment Variables**: `dotenv`

---

## ## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### ### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (v14 or higher)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### ### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone 
    cd connectsphere-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the root of the project and add the following variables.

    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Run the server:**
    To start the server with auto-reloading for development, run:
    ```bash
    npm run dev
    ```
    The server will be available at `http://localhost:5001`.

---

## ## API Endpoints 📖

The base URL for all endpoints is `/api`.

### ### Authentication

| Method | Endpoint         | Description                   | Access   |
| :----- | :--------------- | :---------------------------- | :------- |
| `POST` | `/auth/register` | Register a new user.          | Public   |
| `POST` | `/auth/login`    | Log in a user and get a token.| Public   |

### ### Users

| Method | Endpoint              | Description                    | Access    |
| :----- | :-------------------- | :----------------------------- | :-------- |
| `GET`    | `/users/:username`    | Get a user's profile.          | Public    |
| `POST`   | `/users/:id/follow`   | Follow or unfollow a user.     | Protected |

### ### Posts

| Method | Endpoint               | Description                       | Access    |
| :----- | :--------------------- | :-------------------------------- | :-------- |
| `POST`   | `/posts`               | Create a new post.                | Protected |
| `GET`    | `/posts`               | Get all posts.                    | Public    |
| `DELETE` | `/posts/:id`           | Delete a post.                    | Protected |
| `POST`   | `/posts/:id/like`      | Like or unlike a post.            | Protected |
| `POST`   | `/posts/:id/comments`  | Add a comment to a post.          | Protected |
| `GET`    | `/posts/:id/comments`  | Get all comments for a post.      | Public    |

### ### Feed

| Method | Endpoint | Description                                       | Access    |
| :----- | :------- | :------------------------------------------------ | :-------- |
| `GET`    | `/feed`    | Get the personalized feed for the logged-in user. | Protected |