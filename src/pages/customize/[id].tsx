import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { Button, TextField } from '@mui/material';

import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Customize.module.scss'
import MoviesContext from '../../context/MoviesContext';

const CustomizeRows = () => {  
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter()
  const { id }: any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));
  
  const [seatDetails, setSeatDetails] = useState<Seats>(movie?.seats || {});
  const [row, setRow] = useState<number>(movie?.rows || 0);
  const [column, setColumn] = useState<number>(movie?.cols || 0);
  
  useEffect(() => { clearSelectedSeats(); }, [])

  useEffect(() => { 
    handleSubmit();
  }, [row, column])

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = {...seatDetails};
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const handleSubmit = () => {
    let newSeatObject: Seats = {};
    let key: string;
    for (let i=0; i<column; i++) {
      if (i<26) {
        key = String.fromCharCode(65+i)
      } else {
        let character = String.fromCharCode(64+(i/25));
        key = `${character}${String.fromCharCode(64+i%25)}`;
      }
      newSeatObject[key] = Array(row).fill(0).map((_,i)=> {
        if (seatDetails && seatDetails[key] && seatDetails[key][i]) {
          return seatDetails[key][i];
        } else {
          return 0;
        }
      });
    }
    console.log(seatDetails)
    setSeatDetails(newSeatObject); 
  }

  const handleSaveSetup = async () => {
    let movieIndex = movies.findIndex(mov => mov.id === parseInt(id));
    if (movieIndex !== -1 && setMovies) {
      movies[movieIndex].seats = seatDetails;
      setMovies(movies);
      router.push(`/details/${id}`);
    }
  }

  const RenderInputFields = () => {
    return (
      <div className={styles.inputContainer}>
        <form className={styles.inputHolder}>
          <TextField id="row" type='number' label="Row" variant="outlined" size="small" className={styles.inputField}
            name="row" value={row} onChange={(e) => setRow(parseInt(e.target.value) || 0)} />
          <TextField id="outlined-basic" type='number' label="Column" variant="outlined" size="small" className={styles.inputField}
            value={column} onChange={(e) => setColumn(parseInt(e.target.value) || 0)} />
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
    
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Customize Rows</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>{movie.name}</h1>
        {RenderInputFields()}
        <p className={styles.header}>Select Seats to be <b className={styles.headerBlockedText}>Blocked</b></p>
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