import axios from 'axios'
import useSWR from 'swr'

function useGetMovies () {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/movies`, fetcher)

  return {
    movies: data,
    isLoading: !error && !data,
    isError: error
  }
}

export {useGetMovies}