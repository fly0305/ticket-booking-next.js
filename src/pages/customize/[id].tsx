import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material';

import { Movie, Seats } from '../../constants/models/Movies'
import { useGetMovieById, useBookTicketByMovieId } from '../../services/movies'
import styles from './Customize.module.scss'
import { Box } from '@mui/system';

const CustomizeRows = () => {  
  const router = useRouter()
  let selectedSeats: string[] = [];
  const { id }: any = router.query
  const { movie, isLoading, isError }: MovieType = useGetMovieById(id);
  const [seatDetails, setSeatDetails] = useState<Seats>({});
  const [row, setRow] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);

  useEffect(() => { 
    if (movie?.seats) {
      setRow(movie?.rows || 0)
      setColumn(movie?.cols || 0)
      setSeatDetails(movie.seats); 
    }
  }, [movie])
  
  useEffect(() => { 
    handleSubmit();
  }, [row, column])

  const handleSubmit = () => {
    let newSeatObject: Seats = {};
    let key;
    for (let i=0; i<column; i++) {
      if (i<26) {
        key = String.fromCharCode(65+i)
      } else {
        let character = String.fromCharCode(64+(i/25));
        key = `${i%25}${character}`;
      }
      newSeatObject[key] = Array(row).fill(0);
    }
    setSeatDetails(newSeatObject); 
  }

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = {...seatDetails};
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 3) {
          newMovieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const handleSaveSetup = async () => {
    const res = await useBookTicketByMovieId(id, seatDetails);
    if (res.status === 200) {
      console.log(res);
      router.push(`/details/${id}`);
    } else {
      console.log(res);
    }
  }

  const RenderInputFields = () => {
    return (
      <div className={styles.inputContainer}>
        <form className={styles.inputHolder}>
          <TextField id="row" type='number' label="Row" variant="outlined" size="small" className={styles.inputField}
            name="row" value={row} onChange={(e) => setRow(parseInt(e.target.value))} />
          <TextField id="outlined-basic" type='number' label="Column" variant="outlined" size="small" className={styles.inputField}
            value={column} onChange={(e) => setColumn(parseInt(e.target.value))} />
          <Button onClick={handleSaveSetup} variant="contained" className={styles.saveSetUpButton}>
            Save Setup
          </Button>
        </form>
      </div>
    )
  }

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      if (seatValue === 1) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 3; 
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
    } else {  // Seat Blocked
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
    
  if (isError) return <div>failed to load</div>
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Customize Rows</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>{movie.name}</h1>
        {RenderInputFields()}
        <p>Select Seats to be <b>Blocked</b></p>
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
 
export default CustomizeRows;