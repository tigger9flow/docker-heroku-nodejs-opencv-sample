const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('*', (req, res) => res.send('It works!'));

app.listen(PORT, err => {
  if (err) console.error(err);

  console.log(`Server is app and running on ${PORT} port.`)
});
