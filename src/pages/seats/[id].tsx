import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';

import { Movie, Seats } from '../../constants/models/Movies'
import { useGetMovieById } from '../../services/movies'
import styles from './Seats.module.scss'

const Seats = () => {  
  const router = useRouter()
  let selectedSeats: string[] = [];
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
      if (seatValue === 1) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 2; 
      } else {
        seatDetails[key][rowIndex] = 0; 
      }
    }
    setSeatDetails({...seatDetails});
  }

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */
  const getClassNameForSeats = (seatValue: number) => {
    let dynamicClass;
    if (seatValue === 0) {  // Not booked
      dynamicClass = styles.seatNotBooked;
    }else if (seatValue === 1) {  // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {  // Seat Selected
      dynamicClass = styles.seatSelected;
    } else { // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`
  }

  const RenderSeats = () => {
    let seatArray = [];
    for(let key in seatDetails) {
      let colValue = seatDetails[key].map((seatValue, rowIndex) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
            {rowIndex+1}
          </span>
          {seatDetails && rowIndex === seatDetails[key].length-1 && <><br/><br/></>}
        </span>
      ))
      seatArray.push(colValue);
    }
    return (
      <div className={styles.seatsLeafContainer}>{seatArray}</div>
    ) 
  }

  const RenderPaymentButton = () => {
    selectedSeats = [];
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex+1}`)
        }
      })
    }
    if (selectedSeats.length) {
      return (
        <Link href={{ pathname: '/payment', query: { movieId: movie.id, seatDetails: JSON.stringify(seatDetails) } }}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
              Pay Rs.{selectedSeats.length*(movie.ticketCost || 0)}
            </Button>
          </div>
        </Link>
      )
    } else {
      return <></>
    }
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
        <RenderPaymentButton />
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