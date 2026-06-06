Create bot API script using Node.js and Express.js. 

Here is an example script:

------------------------------------------------------------------------------------

javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const updatedUser = { ...user, ...req.body };
    users.splice(users.indexOf(user), 1, updatedUser);
    res.json(updatedUser);
  }
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    users.splice(users.indexOf(user), 1);
    res.json({ message: 'User deleted' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

------------------------------------------------------------------------------------

However, please note that you need to install the express package.
