import type { NextApiRequest, NextApiResponse } from 'next'

import { Movie } from '../../../constants/models/Movies'
import { movies } from '../../../constants/movies'


export default function handler(req: NextApiRequest,res: NextApiResponse<Movie[]>) {
  if (req.method === 'GET') {
    res.status(200).json(movies)
  }
}
