const express = require('express');
const helmet = require('helmet');

const ArtistRouter = require('./artists/router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/artists', ArtistRouter);

server.use('*', (req, res) => {
  res.status(404).json('Resource not found');
});

//eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
