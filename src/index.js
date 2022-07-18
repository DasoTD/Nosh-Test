const server = require('./server');
require('dotenv').config();

const { PORT } = process.env;

async function onListening() {
  console.log(`Listening on port ${PORT}`);
}


function onError(err) {s
  if (err.errno === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy.`);
  } else {
    console.log(`Error starting server: ${err}`);
  }

  process.exit(1);
}

// const serverInstance = 
server.listen(PORT, onListening);

