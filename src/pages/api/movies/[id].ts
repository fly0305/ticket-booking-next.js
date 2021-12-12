import type { NextApiRequest, NextApiResponse } from 'next'

import { Movie } from '../../../constants/models/Movies'
import { movies } from '../../../constants/movies'

export default function handler(req: NextApiRequest,res: NextApiResponse<Movie|undefined>) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    if (typeof id === 'string') {
      const movie = movies.find(movie => movie.id === parseInt(id))
      res.status(200).json(movie)
    }
  } else if (req.method === 'PUT') {
    if (typeof id === 'string') {
      const movieIndex = movies.findIndex(movie => movie.id === parseInt(id))
      movies[movieIndex].seats = req.body.seatDetails;
      res.status(200).json(movies[movieIndex])
    }
  }
}
