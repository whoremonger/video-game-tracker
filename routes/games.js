const { Router } = require('express')
const Joi = require('joi')
const router = Router()

const games = [
  { 
    id: 1,
    title: "The Division 2",
    image: "images/theDivision2.jpg",
    genre: "Tactical Shooter",
    console: "PC",
    year: "2019",
    description: "A 3rd person military tactical shoot set in a destroyed Washington DC where you fight off various factions from taking over the city",
    datePassed: "7/11/2022" 
  },

  {
    id: 2,
    title: "No Man's Sky",
    image: "images/noMansSky.jpg",
    genre: "Adventure/Survival",
    console: "PC",
    year: "2018",
    description: "A survival space adventure where the players explores and colonies planets in endless solar systems in the Milky Way Galaxy.",
    datePassed: "4/25/2021"
  },

  {
    id: 3,
    title: "Cyberpunk 2077",
    image: "images/cyberpunk_2077.jpg",
    genre: "RPG",
    console: "PC",
    year: "2020",
    description: "A RPG which the player plays as V in a cyberpunk setting doing missions in Night City.",
    datePassed: "2/15/2022"
  },
]


//full list of games
router.get('/', (req, res) => {
  res.send(games)
})

//show 1 game
router.get('/:id', (req, res) => {
 const game = games.find(g => g.id === parseInt(req.params.id))
 if(!game) { //not found 404
  return res.status(404).send(`The game of ID of ${req.params.id} was not found.`)
 }
 res.send(game)
})


//create game
//also validate for any spaces
//use joi for data validation
router.post('/', (req, res) => {
  const result = validateGame(req.body)
  const { error } = validateGame(req.body) //result.error destructuring
  if(error) {
    return res.status(400).send(result.error.details[0].message)
    
  }
  console.log(result)
  //if (!req.body.title || !req.body.image || !req.body.genre || !req.body.console || !req.body.year || !req.body.description) {
  
  //400 bad request
 
    //res.status(400).send("A game title, image, genre, console, year, *or* description, date passed must be inputed.")  
     //so to not execute the rest of the function
  //}

  const game = {
    id: games.length + 1,
    title: req.body.title, //input
    image: req.body.image, //add image dropbox
    genre: req.body.genre, //select box
    console: req.body.console,  //radio buttons
    year: req.body.year, //input
    description: req.body.description, // text area
    datePassed: req.body.datePassed
  }
  games.push(game)
  console.log("A new game has been passed!")
  res.send(game)
})

router.put('/:id', (req, res) => {
  //look up game with id
  //if not there, return 404 error
  //validate, if not valid return 400 error - Bad request
  //if all good update the game and return the update
  const game = games.find(g => g.id === parseInt(req.params.id))
  if(!game) { //not found 404
    return res.status(404).send(`The game of ID of ${req.params.id} was not found.`)
    
  }

  const result = validateGame(req.body)
  const { error } = validateGame(req.body) //result.error destructuring
  if(error) {
    return res.status(400).send(result.error.details[0].message)
    
  }

  game.title = req.body.title,
  game.image = req.body.image,
  game.genre = req.body.genre,
  game.console = req.body.console,
  game.year = req.body.year,
  game.description = req.body.description,
  game.datePassed = req.body.datePassed
  
  console.log("The game has been updated.")
  res.send(game)

})

router.delete('/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id))
  if(!game) { //not found 404
    return res.status(404).send(`The game of ID of ${req.params.id} was not found.`)
  }

  //delete
  const index = games.indexOf(game)
  games.splice(index, 1)
  res.send(game) 
})

//maybe make this into a middleware file
function validateGame(game) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    image: Joi.string().min(1).required(),
    genre: Joi.string().min(3).required(),
    console: Joi.string().min(2).required(),
    year: Joi.string().min(4).required(),
    description: Joi.string().min(10).required(),
    datePassed: Joi.string().min(6).required()
  })
  
  return schema.validate(game)
}

module.exports =  router

///show all video game data (get) for a few games (sample data )
//title, image, console, year made, genre, description, price (maybe add years old ) for the  model/schema
//install body parser to read json body

//once sample data is complete do create, update, delete game

//add data validations 

//use postman to test routes
//use router

//use mongo db database

//add authentication later ... a user model
 //a review or rating api later, to CRUDE at rating or review

 ///Games i played  or game tracker app?



