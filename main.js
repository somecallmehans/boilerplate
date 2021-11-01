const { db } = require('./server/db');
const app = require('./server/server');
const PORT = 3000;

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  });
