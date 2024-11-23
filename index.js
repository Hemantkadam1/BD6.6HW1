const cors = require("cors");
const express = require("express");
const {getAllMovies , getMoviesById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

//Endpoint to retrive all movies
app.get("/movies",async(req,res)=>{
  const movie = getAllMovies();
  res.json({movie});
});

//Endpoint to get movie by id
app.get("/movies/details/:id",async(req,res)=>{
  let movie = getMoviesById(parseInt(req.params.id));
  res.json({
    movie,
  });
});
module.exports = {app};