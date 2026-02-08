import { Link } from "react-router-dom";
import "../styles/global.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-emoji">🔍</div>
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="home-btn">
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;