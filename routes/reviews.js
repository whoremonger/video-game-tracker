const { Router } = require('express')
const Joi = require('joi')

//const gamesRoute = require('./games')
//maybe use query strings or query.params from filter out games and reviews, and ratings relationships
//this route will contain game reviews after it was played. It will be a 
//summary of the game and a few positives and negatives of the game.
//it will be another show request from a link of the get requests

const router = Router()

const reviews = [ //may one review.. a map or hash? depends on game it on game id
  {
    reviewId: 1, //id of the game 
    review: "The Division 2 was a fun enjoyable game. I like the improvement of speed and movement " +
    "from the last game. There is a good weapon selection. The environment was sunny and looked convincing. " +
    "the negative thing is that it lacks the depressing mood of the last game. Also the story wasn't as interesting as before " +
    "I recommend to buy this game.",
    rating: "4/5"
  },

  {
    reviewId: 2, //id of the game 
    review: "No Man's Sky was a unique and interesting game. It really did well in the exploration factor of its genre. " +
    "It was more of a survival game than anything else. The negatives is that it can be boring for some players and may lack direction " +
    "of story. Many of the ships and characters are generic no name types. I recommend putting in many hours into this game.",
    rating: "4/5"
  },

  {
    reviewId: 3,
    review: "Cyberpunk 2077 was an excellent RPG. He setting and story of the game was great. The music was good as well as the fighting " +
    "and driving mechanics. It was one of the best games this year. Negatives was that it had a poor release with the game withered in bugs " +
    "and graphical glitches. However, the patched the game with a 1.5 update. Everyone that plays video games should pick it up.",
    rating: "5/5"

  }
]

//get all reviews
router.get('/', (req, res) => {
  res.send(reviews)
})

//show 1 review
router.get('/:reviewId', (req, res) => {
  const review = reviews.find(g => g.reviewId === parseInt(req.params.reviewId))
  if(!review) { //not found 404
   return res.status(404).send(`A review of ID of ${req.params.reviewId} was not found.`)
  }
  res.send(review)
 })

//create review
router.post('/', (req, res) => { 
  const result = validateReview(req.body)
  const { error } = validateReview(req.body)
  if (error) {
    return res.status(400).send(result.error.details[0].message)
  }
  console.log(result)

  const review = {
    reviewId: reviews.length + 1,
    review: req.body.review, 
    rating: req.body.rating  
  }

  reviews.push(review)
  console.log("A review and a rating as been created!")
  res.send(review)
})

router.put('/:reviewId', (req, res) => {
  const review = reviews.find(g => g.reviewId === parseInt(req.params.reviewId))
  if(!review) { //not found 404
    return res.status(404).send(`The game of ID of ${req.params.reviewId} was not found.`) 
  }

  const result = validateReview(req.body)
  const { error } = validateReview(req.body) //result.error destructuring
  if(error) {
    return res.status(400).send(result.error.details[0].message) 
  }

  review.review = req.body.review,
  review.rating = req.body.rating
  console.log("The review or rating has been edited.")
  res.send(review)
})

router.delete('/:reviewId', (req, res) => {
  const review = reviews.find(g => g.reviewId === parseInt(req.params.reviewId))
  if(!review) { //not found 404
    return res.status(404).send(`The game of ID of ${req.params.reviewId} was not found.`)
  }
  const index = reviews.indexOf(review)
  reviews.splice(index, 1)
  console.log("the review has been deleted.")
  res.send(review) 
})



function validateReview(review) {
  const schema = Joi.object({
    review: Joi.string().min(30).required(),
    rating: Joi.string().min(3).required() 
  })
  return schema.validate(review)
}



module.exports = router, reviews
