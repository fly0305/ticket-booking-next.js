import Navbar from "./Navbar"

const Layout = ({ children }: any) => {
  return (
    <div className="content">
      <Navbar />
      { children }
    </div>
  );
}
 
export default Layout;