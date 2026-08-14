# 📚 ShareMyNotes

A single-page web for students to upload, browse, and share study notes — with study groups, direct messaging, likes/comments, and a personal library.
Built with HTML, CSS, and JavaScript (no backend — data persists in `localStorage`).

<!--
  🖼️ ADD YOUR SCREENSHOT HERE
  1. Take a screenshot of the app (e.g. the Home page).
  2. Create a folder called "assets" in your repo root.
  3. Save the image as assets/screenshot.png
  4. Uncomment the line below.
-->
<!-- ![ShareMyNotes Screenshot](assets/screenshot.png) -->

---



## ✨ Features

- **Auth** — Sign up / log in (stored locally), with locked pages for guests
- **Upload Notes** — Add title, subject, description, and a file (PDF/image)
- **Browse & Search** — Live search across trending notes by title, subject, or description
- **Engagement** — Like, dislike, comment, and save notes to your personal library
- **View / Download** — Open a note in a new tab or download it directly
- **Study Groups & DMs** — Create groups, add contacts, and chat
- **Profile** — Editable name & bio, plus profile picture upload
- **Dark Mode** — Toggle light/dark theme

---

## 🛠️ Tech Stack

| Layer     | Tech                          |
|-----------|--------------------------------|
| Structure | HTML5                          |
| Styling   | CSS    |
| Logic     | JavaScript       |
| Fonts     | [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts |
| Storage   | Browser `localStorage`         |

No build tools, frameworks, or backend required — it's a static site.

---

## 📁 Project Structure

```
sharemynotes/
├── index.html     
├── style.css     
├── script.js      
└── README.md
```

---

## 🚀 Getting Started

No installation needed — it's plain HTML/CSS/JS.


### Demo Login
| Username  | Password |
|-----------|----------|
| `Demo` | `demo`    |

> ⚠️ This app stores all data (accounts, notes, messages, profile pics) in the browser's `localStorage`. Nothing is sent to a server, so clearing your browser data will reset the app.
