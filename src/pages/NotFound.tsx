import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="content">
        <h1 className="title">Oops!</h1>
        <p className="subtitle">The page you're looking for doesn't exist.</p>
        <div className="image-container">
          <img className="image" src="/not-found.jpg" alt="404 Error" />
        </div>
        <Link to="/" className="button">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
