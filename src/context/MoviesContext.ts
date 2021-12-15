import React from "react";
import { Movie } from "../constants/models/Movies";
import { movies } from "../constants/movies";

export default React.createContext<MovieContextModal>({ movies: movies });

interface MovieContextModal {
  movies: Movie[],
  setMovies?: Function
}