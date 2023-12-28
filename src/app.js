
const express = require('express');
const gameDataRoutes = require('./routes/gameDataRoutes');

const app = express();
app.use(express.json());

app.use('/game-data', gameDataRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app; // for testing