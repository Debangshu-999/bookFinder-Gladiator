import React from 'react';
// import BookRecommenderNavbar from './BookRecommenderNavbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* <nav role="navigation">
        <BookRecommenderNavbar />
      </nav> */}

      <div className="cover">
        {/* <LazyLoadImage
          src="/bookfindercoverimage.jpeg"
          alt="BookFinder Cover"
          effect="blur"
          className="cover-image"
        /> */}
        <div className="title title-overlay-dark">BookFinder</div>
      </div>

      <p className="description-box">An app to discover, explore, and recommend books tailored to your reading preferences.</p>

      <footer className="footer">
        <h3>Contact Us</h3>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </footer>
      <nav></nav>
    </div>
  );
};

export default HomePage;