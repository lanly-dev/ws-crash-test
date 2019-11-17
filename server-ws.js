var path = require('path');
var app = require('express')();
var ws = require('express-ws')(app);
app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'ws.html'));
});
app.ws('/', (s, req) => {
  console.error('websocket connection');
  s.on('message', function(msg) {
   console.log(msg)
  });
  for (var t = 0; t < 3; t++)
    setTimeout(() => s.send('message from lan', ()=>{}), 1000*t);
});
app.listen(3001, () => console.error('listening on http://localhost:3001/'));
console.error('websocket example');