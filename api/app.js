const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

router(app);

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('server staat aan');
});
