import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import animecatalog from "../pictures/animecatalog.jpg"
import animeprofile from "../pictures/animeprofile.jpg"
import animecharacter from "../pictures/animecharacter.jpg"

function WelcomePage() {
  return (
    <WelcomePageStyled>
      <div className="welcome-header">
        <h1>Welcome to AnimeGrid!</h1>
        <p>Discover, explore, and indulge in your favorite anime series. AnimeGrid offers a vast collection of anime shows, complete with reviews, images, and more.</p>
        <div className="button-container">
          <Link to="/homepage">
            <button className="button">Explore Anime</button>
          </Link>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How it Works</h2>
        <div className="step">
          <h3>1. A catalog of anime to look for</h3>
          <div className="step-content">
            <p className="step-description">You have access to search for any anime in our extensive catalog. Find your favorite shows or discover new ones.</p>
            <img src={animecatalog} alt="Anime catalog" className="step-image" />
          </div>
        </div>
        <div className="step">
          <h3>2. Click and Read More</h3>
          <div className="step-content">
            <p className="step-description">Get detailed information about each anime, including a synopsis, trailers, character profiles, and reviews by fellow fans.</p>
            <img src={animeprofile} alt="Click and Read More" className="step-image" />
          </div>
        </div>
        <div className="step">
          <h3>3. Find your character!</h3>
          <div className="step-content">
            <p className="step-description">Explore a collection of images featuring your favorite anime characters. Find wallpapers, fan art, and more.</p>
            <img src={animecharacter} alt="Find your character" className="step-image" />
          </div>
        </div>
      </div>

      <div className="google-form">
        <iframe
          title="Google Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdRipFbG1VLopVMR32PYAX2pS5mwKKMKhw25-T0u0JkJ4ylNg/viewform?embedded=true"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </WelcomePageStyled>
  );
}

const WelcomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #333;
  background-image: linear-gradient(45deg, #1f1f1f 25%, transparent 25%),
                    linear-gradient(-45deg, #1f1f1f 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #1f1f1f 75%),
                    linear-gradient(-45deg, transparent 75%, #1f1f1f 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  background-repeat: repeat;

  .welcome-header {
    margin-top: 14rem;
    text-align: center;
    color: #fff;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: center; /* Center the button horizontally */
  }

  .button {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    background-color: #ff5e5e;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #ff3c3c;
    }
  }

  .how-it-works {
    margin-top: 14rem;
    text-align: center;
    color: #fff;

    h2 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .step {
      margin-bottom: 3rem;

      h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
      }

      .step-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
      }

      .step-description {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #ccc;
        text-align: center;
      }

      .step-image {
        max-width: 1200px;
        border: 4px solid lightgray;
        border-radius: 50px;
        padding: 8px;
      }
    }
  }

  .google-form {
    margin-top: 2rem;
    width: 720px;
    height: 1000px;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
      overflow: hidden;
    }
  }
`;

export default WelcomePage;
