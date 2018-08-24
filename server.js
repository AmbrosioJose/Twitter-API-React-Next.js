const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const api = require('./twitter-api.js')

const tweets = {
  term: [],
  username: [],
  name:[]
}

// socket.io server
io.on('connection', socket => {
  // socket.emit('searched.response', tweets.term)
  socket.emit('screenname.response', tweets.username)
  socket.emit('searchedUser.response', tweets.name)
  socket.on('clickedTest', (data) => {

    // gets twitter feed from account and prints it---------------

    

    api.getTweets().then((result)=>{
      // console.log(result)
      data = result
      socket.emit('clicked.response', data)
    }).catch( (err) =>{socket.emit('clicked.response', [])})

    //----------------------------------------------
  })

  socket.on('searchTweet', (term) => {
    if(!term)
      term='Batman'
    // gets search term from twitter and emit it---------------
    api.searchTweets(term).then((result)=>{

      
      tweets.term = result
      socket.emit('searched.response', result)
    }).catch( (err) =>{ socket.emit('searched.response', [])})

    //----------------------------------------------
  })

  socket.on('searchScreenName', (screenName) => {

    // gets twitter feed from account and prints it---------------

    if(!screenName)
      screenName='Btmn_Ambrosio'

    console.log('searching for screename: '+ screenName)
    if(screenName.length>1)
      api.getScreenNameTweets(screenName).then((result)=>{
        tweets.username = result
        socket.emit('screenname.response', result)
      }).catch( (err) =>{socket.emit('screenname.response', [])})
    else{socket.emit('screenname.response', [])}
    //----------------------------------------------
  })

  socket.on('searchName', (query) => {
    if(!query)
    query='Batman'
    // gets search term from twitter and emit it---------------
    api.searchUsers(query).then((result)=>{
      tweets.name = result
      socket.emit('searchedUser.response', result)
    }).catch( (err) =>{console.log(err)})

    //----------------------------------------------
  })
  
})

nextApp.prepare().then(() => {
  // one way of returning data from server
  app.get('/tweets/:tweets', (req, res) => {
    res.json(tweets[req.params.tweets])
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
