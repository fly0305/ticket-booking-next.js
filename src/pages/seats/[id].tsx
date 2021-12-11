import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Movie, Seats } from '../../constants/models/Movies'
import { useGetMovieById } from '../../services/movies'
import styles from './Seats.module.scss'

const Seats = () => {  
  const router = useRouter()
  const { id }: any = router.query
  const { movie, isLoading, isError }: MovieType = useGetMovieById(id);
  const [seatDetails, setSeatDetails] = useState<Seats>({});

  useEffect(() => { 
    if (movie && movie.seats) {
      setSeatDetails(movie.seats); 
    }
  }, [movie])

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      seatDetails[key][rowIndex] = 1;
    }
    console.log(seatDetails);
    setSeatDetails({...seatDetails});
  }

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   */

  const RenderSeats = () => {
    let seatArray = [];
    for(let key in seatDetails) {
      let colValue = seatDetails[key].map((seatValue, rowIndex) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span className={`${styles.seats} ${styles.seatSelected}${seatValue}`} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
            {rowIndex+1} {seatValue}
          </span>
          {seatDetails && rowIndex === seatDetails[key].length-1 && <><br/><br/></>}
        </span>
      ))
      seatArray.push(colValue);
    }
    return (
      <>{seatArray}</>
    ) 
  }

  if (isError) return <div>failed to load</div>
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Seats</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>{movie.name}</h1>
        {seatDetails && <RenderSeats />}
      </div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default Seats;