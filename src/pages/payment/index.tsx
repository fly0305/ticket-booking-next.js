import { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';

import { Movie, Seats } from '../../constants/models/Movies'
import { useGetMovieById, useBookTicketByMovieId } from '../../services/movies'
import styles from './Payment.module.scss'

const Tickets = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(500);
  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 20, ticketCost: number, bookingFee: number, totalCost: number;
  const {movieId, seatDetails}: any = router.query;
  const { movie, isLoading, isError }: MovieType = useGetMovieById(movieId);
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      router.push('/');
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];
    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex+1}`)
        }
      })
    }
    return selectedSeats;
  }

  const RenderSeatDetails = ({selectedSeats}: {selectedSeats: string[]}) => {
    ticketCost = selectedSeats.length*(movie.ticketCost||0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(', ')} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>
          Rs.{ticketCost}
        </div>
      </div>
  )}

  const RenderBookingCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Booking Charge
        </div>
        <div className={styles.seatCost}>
          Rs.{bookingFee}
        </div>
      </div>
  )}

  const RenderTotalCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Total
        </div>
        <div className={styles.seatCost}>
          Rs.{totalCost}
        </div>
      </div>
  )}

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = {...movieSeatDetails};
    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const onConfirmButtonClick = async () => {
    const res = await useBookTicketByMovieId(movieId, modifiedSeatValue());
    if (res.status === 200) {
      router.push('/');
    } else {
      console.log(res);
    }
  }

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} onClick={onConfirmButtonClick}>
          Confirm Booking ({seconds})
        </Button>
      </div>
    )
  }

  const RenderCard = () => {
    let selectedSeats: string[] = computeSelectedSeats();
    
    if (isError) return <div>failed to load</div>
    if (!movie) return <div>loading...</div>
    return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        BOOKING SUMMARY
      </div>
      <RenderSeatDetails selectedSeats={selectedSeats}/>
      <RenderBookingCharge selectedSeats={selectedSeats}/>
      <hr className={styles.hrStyle}/>
      <RenderTotalCharge selectedSeats={selectedSeats}/>
      <RenderConfirmButton />
    </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <div className={styles.container}>
        <RenderCard />
      </div>
    </>
  );
}
 
type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}

export default Tickets;