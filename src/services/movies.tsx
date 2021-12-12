import axios from 'axios'
import useSWR from 'swr'
import { Seats } from '../constants/models/Movies'

function useGetMovies () {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/movies`, fetcher)

  return {
    movies: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useGetMovieById (id: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/movies/${id}`, fetcher)

  return {
    movie: data,
    isLoading: !error && !data,
    isError: error
  }
}

async function useBookTicketByMovieId (id: string, seatDetails: Seats) {
  return await axios.put(`/api/movies/${id}`, {seatDetails})
}

export {
  useGetMovies,
  useGetMovieById,
  useBookTicketByMovieId
}