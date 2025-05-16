# 📦 express-smart-router

🔁 [View this README in English](./README.md)

**express-smart-router**, Express.js projelerinizde route dosyalarını klasör yapısına göre otomatik olarak yükleyen, versiyonlama ve middleware gibi gelişmiş özellikleri destekleyen güçlü ve sade bir yönlendirme motorudur.

---

## 🚀 Öne Çıkan Özellikler

- ✅ **Otomatik route keşfi** – `routes/` klasörü ve alt klasörler recursive şekilde taranır
- 📁 **`index.js` & `index.router.js`** → klasör köküne bağlanır (`routes/admin/index.js` → `/admin`)
- 📄 **Uzantı desteği** – `.js`, `.router.js`, `.route.js` gibi uzantılar desteklenir
- 🔍 **`match` ile filtreleme** – Regex ile sadece belirli uzantılardaki dosyalar yüklenebilir
- ✨ **`baseRoute`** – Tüm route'lara ön ek ekleyebilirsiniz (örnek: `/api`)
- 🔗 **`middleware`** – Tüm route'lara global middleware tanımlanabilir
- 📣 **`verbose`** – Yüklenen route'lar terminalde listelenir
- 💙 **TypeScript desteği** – Otomatik tanım dosyası (`index.d.ts`) ile uyumludur
- ☁ **Platform bağımsız** – Windows, Linux, macOS desteği

---

## 📦 Kurulum

```bash
npm install express-smart-router
```

---

## 📁 Örnek Proje Yapısı

```
routes/
├── index.js                 → /
├── hello/
│   └── index.js             → /hello
├── auth/
│   └── login.route.js       → /auth/login
└── api/
    ├── v1/
    │   ├── index.router.js  → /api/v1
    │   └── user.router.js   → /api/v1/user
    └── v2/
        └── stats.js         → /api/v2/stats
```

---

## 🔧 Temel Kullanım

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

## ⚙️ Tüm Seçenekler

### 🔁 `baseRoute`: Global ön ek tanımlama

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  baseRoute: '/api'
});
// routes/user.js → /api/user
```

---

### 🧠 `match`: Dosya uzantılarını filtreleme

Sadece `.router.js` ve `.route.js` uzantılı dosyaları yükle:

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  match: /\.(router|route)\.js$/
});
```

Varsayılan değer:
```js
match: /\.js$/
```

> Bu, `.js`, `.router.js`, `.route.js` dosyalarının tümünü içerir.

---

### 🔗 `middleware`: Tüm route'lara uygulanan global middleware'ler

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

### 📣 `verbose`: Terminal loglarını kontrol et

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  verbose: false // hiçbir şey loglanmaz
});
```

---

## ✅ Route Eşleme Kuralları

| Dosya                         | Route             |
|------------------------------|-------------------|
| `routes/index.js`            | `/`               |
| `routes/index.router.js`     | `/`               |
| `routes/hello/index.js`      | `/hello`          |
| `routes/api/v1/index.router.js` | `/api/v1`       |
| `routes/api/v1/user.route.js` | `/api/v1/user`    |
| `routes/api/v2/stats.js`     | `/api/v2/stats`   |

> 📌 Sadece `index.js` ve `index.router.js` özel dosyalardır, diğer dosyalar adlarına göre route'lanır.

---

## 🟦 TypeScript Desteği

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

## 🧪 Test Ortamı

- ✅ Node.js 14+
- ✅ Express 4.x ve üzeri
- ✅ TypeScript 4.x ve üzeri

---

## 📝 Lisans

MIT Lisansı

---

## 👨‍💻 Geliştirici

**Eren Seyfi**  
[GitHub](https://github.com/Eren-Seyfi)
