import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const {id} = useParams()

    //state of anime
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)
    const [reviews, setReviews] = React.useState([]); // Add this line
    const [expandedReviews, setExpandedReviews] = React.useState([]);


    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime

    //get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    }

    //get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
        console.log(data.data)
    }
    const getReviews = async(anime) => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/reviews`)
      const data = await response.json()
      setReviews(data.data)
      console.log(data.data)
    }


    //initial render
    useEffect(() => {
        getAnime(id)
        getCharacters(id)
        getReviews(id)
    }, [])

    const toggleReviewExpansion = (index) => {
      setExpandedReviews((prevExpandedReviews) => {
        const updatedExpandedReviews = [...prevExpandedReviews];
        updatedExpandedReviews[index] = !updatedExpandedReviews[index];
        return updatedExpandedReviews;
      });
  };

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less': 'Read More'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const {role} = character
                    const {images, name, mal_id} = character.character
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt="" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
            <h3 className="title">Reviews</h3>
            <div className="reviews">
                {reviews?.map((review, index) => (
                  <div className="review" key={index}>
                    <p>
                      <span>User: </span>
                      {review.user.username || "Anonymous"}
                    </p>
                    <p className="review-des">
                      {expandedReviews[index] || review.review.length <= 450
                      ? review.review
                      : `${review.review.substring(0, 450)}...`}
                      {review.review.length > 450 && (
                    <button onClick={() => toggleReviewExpansion(index)}>
                      {expandedReviews[index] ? "Show Less" : "Read More"}
                    </button>
                    )}
                    </p>
                  </div>
                ))}
            </div>
    </AnimeItemStyled >
  )
}

const AnimeItemStyled = styled.div`
padding: 3rem 18rem;
  background-color: #ededed;

  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;

    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;

    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .details {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      img {
        border-radius: 7px;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        display: flex;
        gap: 1rem;
      }

      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;

    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all 0.4s ease-in-out;

      img {
        width: 100%;
      }

      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }

      p {
        color: #27ae60;
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  .reviews {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    background-color: #ffffff;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    padding: 2rem;
  }

  .review-container {
    width: calc(50% - 1rem);
    margin-bottom: 2rem;
  }

  .review {
    padding: 1rem;
    background-color: #ededed;
    border-radius: 7px;
    margin-right: 2rem;
    margin-bottom: 2rem;
  }

  /* Additional styles for the light gray background */
  .reviews .review {
    background-color: #f7f7f7;
  }

  .reviews .review:first-child {
    margin-top: 0;
  }

  .reviews .review:last-child {
    margin-bottom: 0;
  }

  .review p {
    margin-bottom: 0.5rem; /* Add space between user line and review line */
  }

  .review p span:first-child {
    font-weight: bold; /* Make the user text bolder */
    font-size: 1.1rem; /* Increase the font size slightly */
  }

  .review p span:last-child {
    font-size: 1.2rem; /* Increase the font size slightly */
  }
  .review-des {
    margin-bottom: 1rem;
    color: #6c7983;
    line-height: 1.7rem;
    position: relative;
  }
  
  .review-des::after {

    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #27ae60;
    color: #ffffff;
    padding: 0.2rem 0.4rem;
  }
  
  .review-des.expanded::after {
    content: "";
  }
  
  .review-des.expanded::before {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #27ae60;
    color: #ffffff;
    padding: 0.2rem 0.4rem;
  }
  
  .review button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #27ae60;
    font-weight: 600;
  }
`;

export default AnimeItem