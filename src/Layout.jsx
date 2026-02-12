import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-vh-100 ">
        <div className="container mt-3">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;