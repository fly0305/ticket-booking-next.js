import { Grid, Button } from '@mui/material';
import Head from 'next/head'
import Link from 'next/link';

import styles from '../styles/Home.module.scss'
import {useGetMovies} from '../services/movies'
import { Movie } from '../constants/models/Movies';

export default function Home() {
  const { movies, isLoading, isError } = useGetMovies();

  const RenderMoviesList = () => {
    if (movies) {
      return movies.map((movie: Movie) => (
        <Grid item xs={4} key={movie.id}>
          <Link href={`/details/${movie.id}`}>
            <div className={styles.card}>
              <div className={styles.movieTitle}> {movie.name} </div>
              <div className={styles.movieLanguage}> {movie.language} </div>
            </div>
          </Link>
        </Grid>
      ))
    } else if (isLoading) {
      return <>Loading Movies...</>
    } else {
      return <>No Movies To Watch...</>
    }
  }
  
  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>
      <div className={styles.moviesContainer}>
        <h1 className={styles.title}>Recommended Movies</h1>
        <Grid container spacing={2}>
          <RenderMoviesList/>
        </Grid>
      </div>
    </>
  )
}
