# 📦 express-smart-router

🔁 [View this README in English](./README.md)

**express-smart-router**, tüm route dosyalarınızı klasör yapısına göre otomatik olarak yükleyen ve Express.js projelerinde versiyonlu API desteği sağlayan basit ve güçlü bir yönlendirme (routing) yükleyicisidir.

---

## 🚀 Özellikler

- ✅ Otomatik route keşfi (`routes` klasörü ve alt klasörler)
- 📁 Dosya ve klasör yapısına göre otomatik `app.use()` tanımlaması
- 🔄 Hem `.js` hem `.router.js` dosyalarını destekler
- 🧠 `index.js` dosyaları kök path'e yönlendirilir (`/api/v1/index.js` → `/api/v1/`)
- 🎯 Versiyonlu API desteği (`/api/v1`, `/api/v2` gibi)
- ☁ Platform bağımsız: Windows, macOS, Linux uyumlu

---

## 📦 Kurulum

```bash
npm install express-smart-router
```

---

## 🛠️ Kullanım

### 📁 Örnek Proje Yapısı

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

## ⚙️ Gelişmiş Kullanım

### 🔎 Sadece `*.router.js` dosyalarını yükle:

```js
loadRoutes(app, path.join(__dirname, 'routes'), {
  match: /\.router\.js$/,
});
```

---

## ✅ Desteklenen Platformlar

- 🪟 Windows
- 🐧 Linux
- 🍎 macOS

---

## 📝 Lisans

MIT Lisansı

---

## ✨ Katkı

Pull request'ler ve öneriler her zaman memnuniyetle karşılanır!

---

## 👨‍💻 Geliştirici

**Eren Seyfi**  
[GitHub](https://github.com/Eren-Seyfi)


---