# 🎬 XFlix — Video Streaming Platform (Frontend)

A YouTube-inspired video streaming platform built with React.js. Browse, search, filter, sort, and upload videos — with a clean dark-themed UI and live demo deployed on Netlify.

🔗 **[Live Demo](https://sankalp-xflix.netlify.app/)**  
🔗 **[Backend Repo](https://github.com/sankalpboudhh/xflix-node)**

---

## 🚀 Features

- **Video Feed** — Fetches and displays all videos from REST API with loading indicator
- **Debounced Search** — Real-time title search with 1000ms debounce to minimize API calls
- **Genre Filtering** — Multi-select genre chips (Education, Sports, Comedy, Lifestyle) with combined filter support
- **Age/Content Rating Filter** — Filter videos by suitability (Anyone, 7+, 12+, 16+, 18+)
- **Sort** — Sort videos by Release Date or View Count via dropdown
- **Video Detail Page** — Individual video page with embedded player, vote and view count tracking
- **Upload Modal** — Upload new videos with title, link, thumbnail, genre, age rating, and date picker
- **Responsive Layout** — 4-column grid on desktop, adapts to mobile
- **Cypress E2E Tests** — Assessment test suite included

---

## 🛠️ Tech Stack

- React.js 17
- React Router DOM v5
- Material UI (MUI) v5 + MUI X Date Pickers
- Axios
- Notistack — Snackbar notifications
- Cypress — End-to-end testing

---

## 📁 Project Structure

```
frontend/src/
├── App.js                        # Routes + API endpoint config
├── Components/
│   ├── Videos.js                 # Main feed — genre/age filters, sort, search, video grid
│   ├── VideoGrid.js              # Individual video card with relative time formatter
│   ├── VideoPage.js              # Video detail/player page
│   ├── Header.js / Header.css    # App header with search bar
│   ├── SearchBar.js              # Mobile search bar
│   └── UploadModal.js            # Upload form with MUI date picker
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v16+

### Run Locally

```bash
git clone https://github.com/sankalpboudhh/xflix-react.git
cd xflix-react/frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## 🔌 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v1/videos | Fetch all videos |
| GET | /v1/videos?title= | Search by title |
| GET | /v1/videos?genres= | Filter by genre(s) |
| GET | /v1/videos?contentRating= | Filter by age rating |
| GET | /v1/videos?sortBy= | Sort by viewCount or releaseDate |
| GET | /v1/videos/:videoId | Get single video |
| POST | /v1/videos | Upload new video |
| PATCH | /v1/videos/:videoId/votes | Upvote or downvote |
| PATCH | /v1/videos/:videoId/views | Increment view count |

---

## 🧠 Key Concepts Demonstrated

- **Debounced search** — clears and resets 1000ms timeout on each keystroke
- **Multi-select genre filtering** — independent boolean state per genre, combined into query string
- **Relative time formatting** — custom `TimeFormat` component converts timestamps to "X days/months/years ago"
- **Conditional sort metadata** — VideoGrid shows release date or view count based on active sort
- **MUI Date Picker integration** — `DesktopDatePicker` with `AdapterDateFns` for upload form

---

## 👤 Author

**Sankalp Boudhh**
- GitHub: [@sankalpboudhh](https://github.com/sankalpboudhh)
- LinkedIn: [linkedin.com/in/sankalpboudhh](https://linkedin.com/in/sankalpboudhh)
- Live Demo: [sankalp-xflix.netlify.app](https://sankalp-xflix.netlify.app/)
