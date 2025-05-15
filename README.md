# 📦 express-smart-router

🔁 [Bu README dosyasını Türkçe olarak görüntüle](./README.tr.md)

**express-smart-router** is a simple and powerful route loader that automatically loads all your route files based on folder structure and supports versioned APIs in Express.js projects.

---

## 🚀 Features

- ✅ Auto-discovery of route files (`routes` folder and subfolders)
- 📁 Automatically mounts using `app.use()` based on file/folder structure
- 🔄 Supports both `.js` and `.router.js` files
- 🧠 `index.js` files are mounted to root path (`/api/v1/index.js` → `/api/v1/`)
- 🎯 API versioning support (`/api/v1`, `/api/v2`, etc.)
- ☁ Cross-platform: works on Windows, macOS, and Linux

---

## 📦 Installation

```bash
npm install express-smart-router
```

---

## 🛠️ Usage

### 📁 Example Project Structure

```
routes/
├── index.js               → /
├── auth/
│   └── login.js           → /auth/login
└── api/
    ├── v1/
    │   └── users.js       → /api/v1/users
    └── v2/
        └── stats.js       → /api/v2/stats
```

### 📄 app.js

```js
const express = require('express');
const path = require('path');
const loadRoutes = require('express-smart-router');

const app = express();
app.use(express.json());

loadRoutes(app, path.join(__dirname, 'routes'));

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
```

---

## ⚙️ Advanced Usage

### 🔎 Only load `*.router.js` files:

```js
loadRoutes(app, path.join(__dirname, 'routes'), {
  match: /\.router\.js$/,
});
```

---

## ✅ Supported Platforms

- 🪟 Windows
- 🐧 Linux
- 🍎 macOS

---

## 📝 License

MIT License

---

## ✨ Contributing

Pull requests and suggestions are always welcome!

---

## 👨‍💻 Author

**Eren Seyfi**  
[GitHub](https://github.com/Eren-Seyfi)


---