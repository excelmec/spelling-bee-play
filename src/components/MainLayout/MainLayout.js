import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        minHeight:"100vh",
        alignItems:"center",
        paddingBottom:"2rem"
    }}>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}

export default MainLayout;
