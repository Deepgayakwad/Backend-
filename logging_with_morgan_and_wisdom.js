// index.js
import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';

const app = express();
const port = 3000;

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseTime] = message.trim().split(" ");
        const logObject = { method, url, status, responseTime };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let nextId = 1;
let teaData = [];

// Add a new tea
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get all teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData);
});

// Update a tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// Delete a tea
app.delete('/teas/:id', (req, res) => {
  const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));
  if (teaIndex === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(teaIndex, 1);
  res.status(204).send("deleted");
});

// Start server
app.listen(port, () => {
  console.log(`server is running on port:# ${port}`);
});
