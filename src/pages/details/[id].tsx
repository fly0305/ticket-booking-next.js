import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';

import { Movie } from '../../constants/models/Movies'
import { useGetMovieById } from '../../services/movies'
import styles from './Details.module.scss'

const Details = () => {  
  const router = useRouter()
  const { id }: any = router.query
  const { movie, isLoading, isError }: MovieType = useGetMovieById(id);

  const RenderBookTicketsButton = () => {
      return (
        <Link href={`/seats/${movie.id}`}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
              Book Ticket
            </Button>
          </div>
        </Link>
      )
  }

  const RenderCustomizeRowsButton = () => {
      return (
        <Link href={`/customize/${movie.id}`}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
              Customize Row
            </Button>
          </div>
        </Link>
      )
  }
    
  if (isError) return <div>failed to load</div>
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Details</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>{movie.name}({movie.language})</h1>
        <div className={styles.language}>Ticket Cost: {movie.ticketCost}</div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonHolder}>
            <RenderBookTicketsButton />
            <RenderCustomizeRowsButton />
          </div>
        </div>
      </div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default Details;