import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo">
          <span className="logo-icon">🔗</span>
          <span>URLShort</span>
        </div>
      </Link>
      <div className="links">
        <Link 
          to="/" 
          className={location.pathname === "/" ? "active" : ""}
        >
          <span>Home</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;