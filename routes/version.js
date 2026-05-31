const packageJson = require('../package.json'); // Assuming package.json is in root
module.exports = (app) => {
  app.get('/version', (req, res) => {
    res.json({ version: packageJson.version });
  });
};