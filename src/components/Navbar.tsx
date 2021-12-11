import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <div className="logo">
          <Image src="/logo.png" alt="site logo" width={40} height={30} />
          <span className="logo-text">Book My Ticket</span>
        </div>
      </Link>
      <Link href="/"><a>Home</a></Link>
      <Link href="/tickets"><a>Book Tickets</a></Link>
    </nav>
);
}
 
export default Navbar;