const express = require('express'); // Assuming Express.js
module.exports = (app) => {
  app.get('/health', (req, res) => {
    console.log('Status OK');
    res.status(200).send('OK');
  });
};