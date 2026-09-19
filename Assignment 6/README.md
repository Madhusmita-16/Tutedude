# Assignment 6: Creating a Simple Web Server with Node.js

## 📌 Objective
Build a custom web server using the core Node.js `http` module to handle different route requests and serve corresponding styled HTML pages asynchronously.

---

## 🚀 Features & Requirements Implemented
- **Pure Node.js Core Modules**: Built using `http`, `fs`, `path`, and `url` without external framework dependencies.
- **Asynchronous I/O**: Reads HTML and CSS static assets using `fs.readFile` to keep server operations non-blocking.
- **Route Handling**:
  - `/` or `/home` -> Serves `index.html` (Home Page) with HTTP status code `200 OK`.
  - `/about` -> Serves `about.html` (About Page) with HTTP status code `200 OK`.
  - `/services` -> Serves `services.html` (Services Page) with HTTP status code `200 OK`.
  - `/contact` -> Serves `contact.html` (Contact Page with interactive form) with HTTP status code `200 OK`.
  - `/*` (unmatched) -> Serves `404.html` (Custom 404 Not Found Page) with HTTP status code `404`.
- **Dynamic Content Headers**: Sets appropriate `Content-Type` headers (`text/html`, `text/css`, `image/png`, `application/json`).
- **Modern UI Styling**: Custom dark mode glassmorphism CSS design system located in `public/style.css`.
- **Server Logging**: Console output for each incoming request with method, timestamp, and requested pathname.

---

## 📁 Project Directory Structure
```
Assignment 6/
├── public/
│   ├── index.html       # Home Page (/home)
│   ├── about.html       # About Page (/about)
│   ├── services.html    # Services Page (/services)
│   ├── contact.html     # Contact Page (/contact)
│   ├── 404.html         # Custom 404 Error Page
│   └── style.css        # Glassmorphism dark mode stylesheet
├── server.js            # Node.js http web server entry point
├── package.json         # Project metadata & npm start script
├── Assignment 6 _ Creating a Simple Web Server with Node.pdf
└── README.md            # Assignment documentation & guide
```

---

## 💻 How to Run the Server

### 1. Start the Server
Run the following command in the `Assignment 6` folder:

```bash
node server.js
```

Or using npm:

```bash
npm start
```

### 2. Test Routes in Browser
Open your browser and navigate to the following endpoints:
- 🏠 **Home Route**: `http://localhost:3000/home`
- 📖 **About Route**: `http://localhost:3000/about`
- 🛠️ **Services Route**: `http://localhost:3000/services`
- 📬 **Contact Route**: `http://localhost:3000/contact`
- ⚠️ **404 Route Test**: `http://localhost:3000/any-unknown-page`

---

## 🔍 How the Server Works (Explanation)
1. **Server Initialization**: `http.createServer()` registers a request listener callback for handling incoming HTTP requests.
2. **URL Parsing**: `url.parse(req.url)` extracts the URL pathname.
3. **Static Asset Detection**: If the request ends with `.css` or static file extensions, it resolves and returns the file directly from the `public/` directory.
4. **Route Mapping**: The `ROUTE_MAP` dictionary matches valid pathnames to HTML filenames.
5. **Asynchronous File Retrieval**: `serveFile()` calls `fs.readFile()` to read the requested file asynchronously.
6. **Response Emission**: `res.writeHead(statusCode, headers)` sets the HTTP status code (`200` or `404`) and headers, and `res.end()` sends the content payload.
