import { Movie } from "./models/Movies";

export const movies: Movie[] = [
  {
    id: 1,
    name: 'Avengers: Endgame',
    language: 'English',
    ticketCost: 200,
    rows: 3,
    cols: 3,
    seats: {
      a: [0,1,2],
      b: [0,0,0],
      c: [0,0,0],
    }
  },
  {
    id: 2,
    name: 'Uri: The Surgical Strike',
    language: 'Hindi'
  },
  {
    id: 3,
    name: 'KGF: Chapter 1',
    language: 'Kannada'
  },
  {
    id: 4,
    name: 'Master',
    language: 'Tamil'
  },
  {
    id: 5,
    name: 'Bahubali: The beginning',
    language: 'Telugu'
  }
]