# 📦 express-smart-router

🔁 [View this README in English](./README.md)

**express-smart-router**, Express.js projelerinde klasör yapısına göre route dosyalarını otomatik olarak yükleyen güçlü ve minimalist bir yönlendirme motorudur. Versiyonlama, route önekleri, dosya filtreleme ve global middleware gibi gelişmiş özellikleri destekler.

[![npm version](https://img.shields.io/npm/v/express-smart-router)](https://www.npmjs.com/package/express-smart-router)

---

## 🚀 Temel Özellikler

- ✅ **Otomatik route keşfi** – `routes/` klasörünü ve alt dizinlerini tarar
- 📁 **`index.js` & `index.router.js`** dosyaları kök route olarak atanır (`routes/admin/index.js` → `/admin`)
- 📄 **Dosya uzantısı desteği** – `.js`, `.router.js`, `.route.js` desteklenir (özelleştirilebilir)
- 🔍 **`match` filtresi** – Belirtilen RegExp ile eşleşen dosyalar yüklenir
- ✨ **`baseRoute`** – Tüm rotalara önek ekler (örn. `/api`)
- 🔗 **`middleware`** – Tüm rotalara global middleware uygular
- 📣 **`verbose`** – Yüklenen rotaları terminalde gösterir
- 💙 **TypeScript desteği** – `index.d.ts` tipiyle birlikte gelir
- ☁ **Çapraz platform** – Windows, Linux ve macOS’ta çalışır

---

## 📦 Kurulum

```bash
npm install express-smart-router
```

---

## 📁 Örnek Proje Yapısı

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

## 🗂️ Route ve Router Dosyaları

`express-smart-router` farklı dosya uzantılarıyla route dosyalarını destekler:

| Uzantı           | Açıklama |
|------------------|----------|
| `.js`            | Genel route dosyasıdır. Tekli veya çoklu endpoint içerebilir. |
| `.router.js`     | `express.Router()` ile oluşturulan modüler route dosyaları için kullanılır. |
| `.route.js`      | Genelde tekil endpoint için uygundur, ancak modüler kullanım da desteklenir. |

Örnek:

```js
// user.router.js
const router = require('express').Router();

router.get('/', (req, res) => res.send('Kullanıcı listesi'));
router.post('/', (req, res) => res.send('Kullanıcı oluştur'));

module.exports = router;
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
  console.log('🚀 Sunucu http://localhost:3000 adresinde çalışıyor');
});
```

---

## ⚙️ Yapılandırma Seçenekleri

### 🔁 `baseRoute`: Tüm rotalara küresel önek

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  baseRoute: '/api'
});
// routes/user.js → /api/user
```

---

### 🧠 `match`: Belirli dosyaları filtrelemek için RegExp

Sadece `.router.js` ve `.route.js` dosyalarını yükle:

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  match: /\.(router|route)\.js$/
});
```

Varsayılan:
```js
match: /\.js$/
```

---

### 🔗 `middleware`: Tüm rotalara uygulanacak middleware

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

### 📣 `verbose`: Konsolda route loglarını aç/kapat

```js
smartRouter(app, path.join(__dirname, 'routes'), {
  verbose: false
});
```

---

## ✅ Route Eşleştirme Kuralları

| Dosya                           | Route           |
|----------------------------------|-----------------|
| `routes/index.js`               | `/`             |
| `routes/index.router.js`        | `/`             |
| `routes/hello/index.js`         | `/hello`        |
| `routes/api/v1/index.router.js` | `/api/v1`       |
| `routes/api/v1/user.route.js`   | `/api/v1/user`  |
| `routes/api/v2/stats.js`        | `/api/v2/stats` |

> 📌 Sadece `index.js` ve `index.router.js` özel giriş noktaları olarak değerlendirilir.

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

## 🧪 Uyumlu Ortamlar

- ✅ Node.js 14+
- ✅ Express 4.x ve 5.x
- ✅ TypeScript 4.x+

---

## 📝 Lisans

MIT Lisansı

---

## 👨‍💻 Geliştirici

**Eren Seyfi**  
[GitHub](https://github.com/Eren-Seyfi)
