import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { Button } from '@mui/material';

import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Seats.module.scss'
import MoviesContext from '../../context/MoviesContext';

const Seats = () => { 
  const { movies } = useContext(MoviesContext);
  const router = useRouter()
  let selectedSeats: string[] = [];
  const { id, seats }: any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));
  const [seatDetails, setSeatDetails] = useState<Seats>(movie?.seats || {});
  
  useEffect(() => { 
    if (!seats) {
      clearSelectedSeats();
    }
  }, [])

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = {...seatDetails};
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      })
    }
    setSeatDetails(newMovieSeatDetails);
  }

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
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
        <Link href={{ pathname: '/payment', query: { movieId: movie?.id, seatDetails: JSON.stringify(seatDetails) } }}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
              Pay Rs.{selectedSeats.length*(movie?.ticketCost || 0)}
            </Button>
          </div>
        </Link>
      )
    } else {
      return <></>
    }
  }
    
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