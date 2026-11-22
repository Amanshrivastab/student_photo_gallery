# 🎓 Student Photo Gallery

A simple and user-friendly web application where students can upload, view, and download their certificates in one centralized gallery.

The **Student Photo Gallery** makes it easier for students to showcase and access their academic achievements, course completion certificates, internships, hackathons, workshops, and other accomplishments.

🌐 **Live Demo:** https://student-photo-gallery-one.vercel.app/

---

## 📸 About the Project

Student Photo Gallery is a full-stack web application developed to provide students with a common platform to store and explore their certificates.

Students can upload certificate images along with their name, roll number, and category. Uploaded certificates are displayed in a public gallery where anyone can view and download them.

To maintain control over uploaded content, certificate deletion is protected by a private password.

## ✨ Features

- 📤 **Certificate Upload:** Upload certificate images with student details.
- 🖼️ **Public Gallery:** View all uploaded certificates in one place.
- 🔍 **Category Filtering:** Filter certificates by category.
- 📥 **Download Certificates:** Download uploaded certificate images.
- 🔐 **Password-Protected Deletion:** Only users with the deletion password can delete certificates.
- 👨‍🎓 **Student Information:** Every certificate includes the student's name and roll number.
- 📱 **Responsive Design:** Accessible across desktop, tablet, and mobile devices.
- ☁️ **Cloud Storage:** Certificate images are stored using Cloudinary.
- 🗄️ **Database Integration:** Student information and certificate metadata are stored in MongoDB.

## 🏷️ Certificate Categories

Certificates can be organized into the following categories:

1. Academic
2. Course Completion
3. Internship
4. Hackathon
5. Achievement
6. Workshop & Webinar
7. Other

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Database |
| Cloudinary | Image storage |
| Multer | File upload handling |
| CSS | Styling |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 🏗️ Project Structure

```text
student-photo-gallery/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

*Note: The folder structure above represents the project's logical organization. Adjust individual folder names if your actual repository differs.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd student-photo-gallery
```

### 2. Set Up the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

DELETE_PASSWORD=your_private_delete_password
```

Add any other environment variables required by your backend configuration.

Start the backend:

```bash
npm start
```

For development, if Nodemon is configured:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Configure the backend API URL in your frontend environment file if required:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The application should now be accessible at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/photos` | Fetch all certificates |
| POST | `/api/photos` | Upload a new certificate |
| DELETE | `/api/photos/:id` | Delete a certificate (password protected) |

### Upload Certificate

The upload endpoint accepts multipart form data containing:

- `name` – Student's full name
- `rollNumber` – Student's roll number
- `category` – Certificate category
- `certificate` – Certificate image file

### Delete Certificate

The delete endpoint requires the private deletion password in the request body.

## ☁️ Deployment

The application is deployed using the following services:

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

**Live Application:** https://student-photo-gallery-one.vercel.app/

## 🔒 Security & Environment Variables

- Sensitive credentials are stored in environment variables.
- The `.env` file should never be committed to GitHub.
- The deletion functionality is protected by a private password.
- Cloudinary handles certificate image storage.

Add the following to your `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

## 🎯 Future Improvements

- [ ] Student authentication and individual profiles.
- [ ] Search certificates by student name or roll number.
- [ ] Admin dashboard for certificate management.
- [ ] Bulk certificate downloads.
- [ ] Pagination for large certificate collections.
- [ ] Improved image optimization and preview.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork this repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add: your feature description"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request.

## 👨‍💻 Author

**Aman Shrivastav**

- GitHub: [@Amanshrivastav](https://github.com/Amanshrivastav)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/aman-shrivastav-375428331/)

---

⭐ If you find this project useful, consider giving it a star!

**Built with ❤️ to make sharing and preserving student achievements easier.**
