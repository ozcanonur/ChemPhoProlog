require = require('esm')(module);
module.exports = require('./main.js');

const { app } = require('./main');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
