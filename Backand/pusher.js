
// var Pusher = require('pusher');


// var pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_APP_KEY,
//   secret: process.env.PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_APP_CLUSTER,
//   encrypted: true,
//   proxy: 'https://localhost:8080',
//   timeout: 5000, // optional, timeout for all requests in milliseconds
//   keepAlive: false
// });

var Pusher = require('pusher');

const  pusher = new Pusher({
  appId: '942215',
  key: '90f8d8cb7358f7669945',
  secret: '6cebcb7f7b066e7c20f3',
  cluster: 'eu',
  encrypted: true
});


module.exports = pusher;