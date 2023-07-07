const express = require("express");
const app = express();
require('express-async-errors')
const cors = require("cors");
const downloadRouter = require('./controllers/download')
const middleware = require('./utils/middleware')


app.use(cors());
app.use(express.static('dist'))
app.use(express.json());
app.use(middleware.requestLogger)
require("dotenv").config();

app.use('/api/download', downloadRouter )


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;