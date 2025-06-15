const express = require('express');
const cors = require('cors');
const { sequelize, Post } = require('./models');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = Buffer.from(base64Url, 'base64').toString('utf-8');
  return JSON.parse(base64);
}

app.post('/admin', async (req, res) => {
  const nowypost = await Post.create({
    poster: req.body.poster,
    tytul: req.body.tytul,
    tresc: req.body.tresc
  });
  return res.send(`Post o tytule ${nowypost.tytul} utworzono pomyślnie.`);
});

app.get('/admin', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }
  const decoded = parseJwt(token);
  const realmRoles = decoded?.realm_access?.roles || [];

  const posts = await Post.findAll();

  if (!realmRoles.includes("admin")) {
    const filtered = posts.filter((post) => post.poster === "moderator");
    return res.send(filtered);
  } else {
    return res.send(posts);
  }
});

setTimeout(() => {
  sequelize.authenticate()
    .then(() => {
      console.log("Połączono z bazą danych.");
      return sequelize.sync();
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Serwer działa na http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error("Błąd połączenia z bazą danych:", err);
    });
}, 5000)
