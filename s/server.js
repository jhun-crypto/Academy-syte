const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// --- 1. Обслуживание основного сайта (HTML/CSS/JS) ---
// Указываем Express, что файлы из папки 'main-site' должны быть доступны по корневому URL (/)
app.use(express.static(path.join(__dirname, 'main-site')));

// Если у вас есть другие HTML-страницы в 'main-site' (например, about.html),
// Express.static уже их обслуживает. Если вы хотите явно указать роут, можно так:
// app.get('/about.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'main-site', 'about.html'));
// });

// --- 2. Обслуживание React-приложения ---
// ВАЖНО: React-приложение должно быть собрано (npm run build) перед запуском сервера.
// Собирайте его в папке 'react-app', и результатом будет папка 'react-app/dist'.

// Указываем Express, что запросы, начинающиеся с '/app/', должны обслуживаться из
// папки 'react-app/dist' (сборка вашего React-приложения).
app.use('/app', express.static(path.join(__dirname, 'react-app', 'dist')));

// Для всех маршрутов, начинающихся с '/app/', всегда возвращаем index.html React-приложения.
// Это необходимо для клиентской маршрутизации React Router.
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-app', 'dist', 'index.html'));
});

// --- Запуск сервера ---
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Основной сайт: http://localhost:${port}/`);
  console.log(`React-приложение: http://localhost:${port}/app/`);
});