const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Путь к директории с вашими файлами
const staticPath = path.join('C:', 'Users', 'Gamee', 'Desktop', 'Speedrun-fig');

// Настройка Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(staticPath)); // Обслуживание статических файлов

// Временное хранилище списка покупок
let shoppingList = [];

// Эндпоинт для получения списка покупок
app.get('/api/shopping-list', (req, res) => {
  res.json(shoppingList);
});

// Эндпоинт для добавления товара в список
app.post('/api/shopping-list', (req, res) => {
  const { item } = req.body;
  if (item) {
    shoppingList.push(item);
    res.status(201).json({ message: 'Item added successfully', item });
  } else {
    res.status(400).json({ error: 'Item is required' });
  }
});

// Эндпоинт для удаления товара из списка
app.delete('/api/shopping-list/:item', (req, res) => {
  const item = req.params.item;
  const index = shoppingList.indexOf(item);

  if (index !== -1) {
    shoppingList.splice(index, 1);
    res.json({ message: 'Item removed successfully', item });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving static files from ${staticPath}`);
});
