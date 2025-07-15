# BlogSage - AI-Powered Blogging Platform

BlogSage is a full-stack blogging platform that allows users to view, comment on blogs, and subscribe to a newsletter for new post notifications. It also features a robust admin panel for managing blogs, comments, and leveraging AI for content generation.

---

## ✨ Features

### User-Facing:
*   **Browse Blogs:** View all published blog posts.
*   **Category Filtering:** Filter blogs by various categories.
*   **Blog Search:** Search for blogs by title or category.
*   **View Full Blog:** Read individual blog posts with rich text formatting.
*   **Comment Section:** Users can add comments to blog posts.
*   **Newsletter Subscription:** Subscribe to receive email notifications when new blogs are posted.

### Admin Panel:
*   **Secure Login:** Dedicated admin login.
*   **Dashboard:** Overview of total blogs, comments, and drafts, with recent blogs.
*   **Blog Management:**
    *   Add new blogs with title, subtitle, category, and rich text description.
    *   **AI Content Generation:** Generate blog content using AI based on a prompt (integrated with Google Gemini).
    *   Upload blog thumbnail images (integrated with ImageKit.io).
    *   Toggle blog publish status (Published/Draft).
    *   Delete existing blogs.
*   **Comment Moderation:**
    *   View all comments (approved and not approved).
    *   Filter comments by status (Approved/Not Approved).
    *   Approve pending comments.
    *   Delete comments.

### Core Functionalities:
*   **API Interactions:** Seamless communication between client and server using Axios.
*   **Global State Management:** Context API for global state like user authentication token and blog data.
*   **Database Integration:** MongoDB for storing blog posts, comments, and newsletter subscribers.
*   **Authentication:** JWT-based authentication for admin routes.
*   **Image Upload:** Handling image uploads via Multer and storing them on ImageKit.io.
*   **Email Notifications:** Sending new blog post notifications to subscribers using Resend.

---

## 🚀 Technologies Used

### Frontend (Client):
*   **React.js:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **React Router DOM:** For declarative routing in React applications.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.
*   **`react-hot-toast`:** Lightweight and customizable toast notifications.
*   **Quill:** A powerful rich text editor for blog descriptions.
*   **Moment.js:** For parsing, validating, manipulating, and formatting dates.
*   **Motion (Framer Motion):** For animations (seen in category filtering).

### Backend (Server):
*   **Node.js:** JavaScript runtime.
*   **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
*   **`dotenv`:** To load environment variables from a `.env` file.
*   **`cors`:** Middleware to enable Cross-Origin Resource Sharing.
*   **`jsonwebtoken`:** For implementing JSON Web Token based authentication.
*   **`multer`:** Middleware for handling `multipart/form-data` (for file uploads).
*   **ImageKit.io:** Cloud-based media management and optimization (for blog images).
*   **Resend:** Email API for sending transactional emails (newsletter notifications).
*   **`marked`:** A markdown parser for converting markdown content to HTML.
*   **Google Gemini API:** Integrated for AI content generation.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Yarn
*   MongoDB (running locally or a cloud service like MongoDB Atlas)

---

## 📦 Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/blogSage.git
cd blogSage
```

### 2. Install Dependencies:

**For the server:**
```bash
cd server
npm install
```

**For the client:**
```bash
cd ../client
npm install
```