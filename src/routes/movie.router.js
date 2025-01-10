import {Router}  from "express"
import { createMovie,getAllMovie,getmovie,uptademovie,deleteMovie } from "../controllers/movie.controller.js"

 export const movieRouter=Router()

movieRouter.post("/movies/register",createMovie)
movieRouter.get("/movies/all",getAllMovie)
movieRouter.get("/movies/:id",getmovie)
movieRouter.put("/movies/:id",uptademovie)
movieRouter.delete("/movies/:id",deleteMovie)
