const express = require('express')
const app = express()
const path = require('path')
const gamesRoute = require('./routes/games')
const ratingsRoute = require('./routes/ratings')
const reviewsRoute = require('./routes/reviews')
const PORT = 3005

app.use(express.json()) //activate body 
app.use(express.urlencoded())

app.use('/api/games', gamesRoute) //adds the /api/games prefix to all the actions
app.use('/api/ratings', ratingsRoute) //adds rating system and their descriptions 1 rating per game and a rating system page
app.use('/api/reviews', reviewsRoute) //adds a review for each game


// Homepage/layout
app.get('/home', (req, res) => {
  res.send('Video Game App')
})


const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`The server started on port ${port}...`)
})

