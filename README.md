
# 🌐 MERN + OAuth Image Search & Multi-Select

A full-stack image search application built with MERN stack (MongoDB, Express.js, React.js, Node.js) integrated with OAuth authentication (Google, GitHub, Facebook).
Users can securely log in, search for images using the Unsplash API, view top searches across all users, and manage their personal search history.

---
## 🚀 Features

- 🔐 OAuth Authentication (Google, GitHub, Facebook) using Passport.js

- 🖼️ Unsplash API Integration – fetch high-quality images

- 🧠 Top Searches Banner – view top 5 most frequent search terms globally

- 🔎 Search Functionality – search images by keyword

- 🧾 User Search History – see your past searches

- ✅ Multi-Select Grid – select multiple images from results

- 💾 MongoDB Storage – logs user searches with timestamps

---
## 🧩 Tech Stack

Frontend: React.js, Bootstrap, Axios

Backend: Node.js, Express.js, Passport.js

Database: MongoDB (Mongoose)

External API: Unsplash Image Search API

---
## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/nikhilyadavsarajolu/image-search-mern-oauth.git
cd image-search-mern-oauth
```

---

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

---
## 3️⃣ Frontend Setup

```bash
cd ../client
npm install
```

---

## 4️⃣ Create `.env` File inside `/server`

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
SESSION_SECRET=<any-secret>

UNSPLASH_ACCESS_KEY=<your-unsplash-api-key>

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>

FACEBOOK_CLIENT_ID=<your-facebook-client-id>
FACEBOOK_CLIENT_SECRET=<your-facebook-client-secret>

CLIENT_URL=http://localhost:3000
```

---
## 5️⃣ Run the Application

#### Start Backend:
```bash
cd server
npm start
```

#### Start Frontend:
```bash
cd ../client
npm start
```

Visit 👉 **http://localhost:3000**

---
## 📁 Folder Structure

```
image-search-mern-oauth/
│
├── /client
│   ├── /src
│   │   ├── components/
│   │   ├── pages/
│   │   ├── auth/
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
│
├── /server
│   ├── /config/
│   ├── /models/
│   ├── /routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---
## 🧪 API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/auth/google` | GET | Google OAuth login |
| `/auth/github` | GET | GitHub OAuth login |
| `/auth/facebook` | GET | Facebook OAuth login |
| `/auth/logout` | GET | Logout user |
| `/auth/user` | GET | Get logged-in user info |
| `/api/search` | POST | Search Unsplash images and log term |
| `/api/top-searches` | GET | Get top 5 global search terms |
| `/api/history` | GET | Fetch logged-in user’s search history |

---
## 🧠 Features Demo (Screenshots)

| Feature | Screenshot |
|----------|-------------|
| OAuth Login | ![OAuth Login](client/screenshots/oauth-login.png) |
| Top Searches Banner | ![Top Searches](client/screenshots/top-searches.png) |
| Image Search + Multi-Select | ![Search Results](client/screenshots/search-results.png) |
| Search History | ![Search History](client/screenshots/search-history.png) |


---
## 🧠 Learnings

- Implemented **OAuth authentication** with Google, GitHub, and Facebook  
- Integrated **Unsplash API** for dynamic image search  
- Built **Protected Routes** and session-based user flow  
- Stored user search logs in **MongoDB**  
- Designed responsive UI using **React Bootstrap**  

---

## 👨‍💻 Author

**Nikhil Yadav**  
B.Tech – Computer Science (Data Science)  
[LinkedIn](https://www.linkedin.com/in/nikhil-yadav-9a3a90270)  
[GitHub](https://github.com/nikhilyadavsarajolu)

---

## ✅ Conclusion

A complete **MERN + OAuth Image Search Application** featuring:
- Google, GitHub, and Facebook login  
- Unsplash API integration  
- Global top searches tracking  
- User-specific search history  
- Multi-select image grid  

🎯 **Project ready for submission to UD Studios Internship Evaluation.**