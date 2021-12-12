import Head from 'next/head'
import { useRouter } from 'next/router'

const Tickets = () => {
  const router = useRouter()
  const {movieId, seatDetails}: any = router.query
  console.log(JSON.parse(seatDetails));
  
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
    </>
  );
}
 
export default Tickets;