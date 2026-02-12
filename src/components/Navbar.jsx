import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="mt-5">
        <NavLink className="h4 mt-5 mx-2" to="/">
          首頁
        </NavLink>
        <NavLink className="h4 mt-5 mx-2" to="/products">
          產品頁
        </NavLink>
        <NavLink className="h4 mt-5 mx-2" to="/cart">
          購物車頁
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;