const express = require('express')
const app = express()
const path = require('path')
const gamesRoute = require('./routes/games')
const ratingsRoute = require('./routes/ratings')
const reviewsRoute = require('./routes/reviews')
const PORT = 3005

app.use(express.json()) //activate body 
app.use(express.urlencoded())

//register view engine (ejs) to display/render webpages
app.set('view engine', 'ejs')

//Access image folder for game pictures
app.use(express.static("images"))

//router shortcuts from each route file 
app.use('/api/games', gamesRoute) //adds the /api/games prefix to all the actions
app.use('/api/ratings', ratingsRoute) //adds rating system and their descriptions 1 rating per game and a rating system page
app.use('/api/reviews', reviewsRoute) //adds a review for each game


// Homepage/layout
app.get('/', (req, res) => {
  res.render('index')
})

//about page
app.get('/about', (req, res) => {
  res.render('about')
})

//webpage server start
const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`The server started on port ${port}...`)
})

