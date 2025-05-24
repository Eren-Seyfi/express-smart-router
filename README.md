# 📦 express-smart-router

🔁 [Bu README dosyasını Türkçe olarak görüntüle](./README.tr.md)

**express-smart-router** is a powerful and minimalist routing engine for Express.js projects. It automatically loads route files based on folder structure and supports advanced features like versioning, route prefixes, file filtering, and global middleware.

[![npm version](https://img.shields.io/npm/v/express-smart-router)](https://www.npmjs.com/package/express-smart-router)

---

## 🚀 Key Features

- ✅ **Auto route discovery** – Recursively scans `routes/` and subdirectories
- 📁 **`index.js` & `index.router.js`** are bound to the folder root (`routes/admin/index.js` → `/admin`)
- 📄 **Extension support** – Supports `.js`, `.router.js`, `.route.js` (configurable)
- 🔍 **`match` filter** – Load only files matching the given RegExp
- ✨ **`baseRoute`** – Add a prefix to all routes (e.g. `/api`)
- 🔗 **`middleware`** – Apply global middleware to all routes
- 📣 **`verbose`** – Log loaded routes to the terminal
- 💙 **TypeScript support** – Ships with `index.d.ts` typings
- ☁ **Cross-platform** – Works on Windows, Linux, and macOS

---

## 📦 Installation

```bash
npm install express-smart-router
```

---

## 📁 Example Project Structure

```
routes/
├── index.js                  → GET /
├── hello/
│   └── index.js              → GET /hello
├── auth/
│   └── login.route.js        → POST /auth/login
└── api/
    ├── v1/
    │   ├── index.router.js   → /api/v1
    │   └── user.router.js    → /api/v1/user
    └── v2/
        └── stats.js          → /api/v2/stats
```

---

## 🗂️ Route vs Router Files

`express-smart-router` supports multiple file extensions for route files:

| Extension         | Description |
|-------------------|-------------|
| `.js`             | General route file. Can be used for single or multiple endpoints. |
| `.router.js`      | Conventionally used for modular route handlers with `express.Router()`. |
| `.route.js`       | Ideal for single-purpose route files, but also supports modular usage. |

Example:

```js
// user.router.js
const router = require('express').Router();

router.get('/', (req, res) => res.send('User list'));
router.post('/', (req, res) => res.send('Create user'));

module.exports = router;
```

---

## 🔧 Basic Usage

```js
const express = require('express');
const path = require('path');
const smartRouter = require('express-smart-router');

const app = express();
app.use(express.json());

smartRouter(app, path.join(__dirname, 'routes'));

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
```

---

## ⚙️ Configuration Options

### 🔁 `baseRoute`: Global prefix for all routes

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  baseRoute: '/api'
});
// routes/user.js → /api/user
```

---

### 🧠 `match`: File matching filter using RegExp

Only load `.router.js` and `.route.js` files:

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  match: /\.(router|route)\.js$/
});
```

Default:
```js
match: /\.js$/
```

---

### 🔗 `middleware`: Global middleware applied to all routes

```js
const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

smartRouter(app, path.join(__dirname, 'routes'), {
  middleware: [logger]
});
```

---

### 📣 `verbose`: Enable/disable console route logs

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  verbose: false
});
```

---

## ✅ Route Resolution Rules

| File                            | Route            |
|---------------------------------|------------------|
| `routes/index.js`               | `/`              |
| `routes/index.router.js`        | `/`              |
| `routes/hello/index.js`         | `/hello`         |
| `routes/api/v1/index.router.js` | `/api/v1`        |
| `routes/api/v1/user.route.js`   | `/api/v1/user`   |
| `routes/api/v2/stats.js`        | `/api/v2/stats`  |

> 📌 Only `index.js` and `index.router.js` are treated as root entry points for folders.

---

## 🟦 TypeScript Support

```ts
import express from "express";
import smartRouter from "express-smart-router";
import path from "path";

const app = express();

smartRouter(app, path.join(__dirname, "routes"), {
  baseRoute: "/api",
  match: /\.(router|route)\.js$/,
  verbose: true,
});
```

---

## 🧪 Compatibility

- ✅ Node.js 14+
- ✅ Express 4.x and 5.x
- ✅ TypeScript 4.x+

---

## 📝 License

MIT License

---

## 👨‍💻 Author

**Eren Seyfi**  
[GitHub](https://github.com/Eren-Seyfi)
