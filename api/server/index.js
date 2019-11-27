const io = require('socket.io')()

io.on('connection', client => { 
  console.log('connected')
})

io.listen(3001)