const request = require("supertest");
const http = require("http");
const { getAllMovies} =require("../controllers");
const { getMoviesById } = require("../controllers");
const {app} = require("../index");
const express = require("express");

jest.mock("../controllers",()=>({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),

}));
let server;
beforeAll(async()=>{
  server = http.createServer(app);
  server.listen(3001);
});
afterAll(async()=>{
  server.close();
});
describe("Controller Function tests",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  it("should return all movies",()=>{
    let mockedeMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan'
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont'
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola'
      }
    ];
    getAllMovies.mockReturnValue(mockedeMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockedeMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests",()=>{
  it("GET /movies should get all movies",async()=>{
    const res = await request(server).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
     movie: [
        {
          movieId: 1,
          title: 'Inception',
          genre: 'Sci-Fi',
          director: 'Christopher Nolan'
        },
        {
          movieId: 2,
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          director: 'Frank Darabont'
        },
        {
          movieId: 3,
          title: 'The Godfather',
          genre: 'Crime',
          director: 'Francis Ford Coppola'
        }
      ],
      
    });
    expect(res.body.movie.length).toBe(3);
  });
  it("GET /movies/details/:id should get an movies by ID",async()=>{
    const res= await request(server).get("/movies/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movie:{
        movieId: 1,
          title: 'Inception',
          genre: 'Sci-Fi',
          director: 'Christopher Nolan'
      },
    });
  });
});