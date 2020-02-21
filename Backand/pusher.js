
var Pusher = require('pusher');

const  pusher = new Pusher({
  appId: '942215',
  key: '90f8d8cb7358f7669945',
  secret: '6cebcb7f7b066e7c20f3',
  cluster: 'eu',
  encrypted: true
});
  

module.exports = pusher;