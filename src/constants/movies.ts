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
      d: [0,1,2],
      e: [0,0,0],
      f: [0,0,0],
      g: [0,1,2],
      h: [0,0,0],
      i: [0,0,0],
      j: [0,1,2],
      k: [0,0,0],
      l: [0,0,0],
      m: [0,1,2],
      n: [0,0,0],
      o: [0,0,0],
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