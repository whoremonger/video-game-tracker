//game reviews and ratings for each video game played
const { Router } = require('express')

//this route will be a show route when the user clicks the game title link or a rating link
//to show the ratings and review. There may be a page just for displaying the rating/review system.

const router = Router()

const ratingSystem = [
  {
    rating: "1/5",
    ratingDescription: "A shit game. Waste of time."
  },
  {
    rating: "2/5",
    ratingDescription: "Poor game. Better to rent then buy. Might be worth a look."
  },
  {
    rating: "3/5",
    ratingDescription: "An Ok game. Can be fun to play but not the best."
  },

  {
    rating: "4/5",
    ratingDescription: "A good game. Good quality and fun to play. You should buy it."
  },

  {
    rating: "5/5",
    ratingDescription: "Highest quality game. Excellent. A must buy."
  }
  
]

router.get('/', (req, res) => {
  res.render('ratingSystem').send(ratingSystem)
})

module.exports = router