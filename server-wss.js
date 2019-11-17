const https = require('https')
const path = require('path')
const app = require('express')()
const createCert = require('create-cert')
app.get('/',(req,res) => {
  console.error('express connection')
  res.sendFile('client.html')
})

createCert().then(keys => {
  httpsServer = https.createServer(keys,() => console.error('listening on http://localhost:3001/')).listen(3001)
  require('express-ws')(app,httpsServer)

  app.ws('/',(s,req) => {
    console.error('websocket connection')
    s.on('message',function (msg) {
      console.log(msg)
    })
    for (const t = 0;t < 3;t++)
      setTimeout(() => s.send('message from lan',() => { }),1000 * t)
  })
})