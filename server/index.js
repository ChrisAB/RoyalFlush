const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

let mongoURL = process.env.MONGODB_URL;
mongoURL = mongoURL.replace('<password>', process.env.DB_PASSWORD)

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successfully connected to database")).catch(err => {
  console.log(err);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
