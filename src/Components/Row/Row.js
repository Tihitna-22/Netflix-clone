import axios from '../../Variables/axios'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
// import requests from '../Variables/requests'
// import instance from '../Variables/axios'
import './Row.css'

const base_url = "https://image.tmdb.org/t/p/w500"

function Row({ title, fetchUrl, islargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')



  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      // console.log(request)
      setMovies(request?.data.results)
      return request
    }
    fetchData()

  }, [fetchUrl])

  // console.log(movies)
  const classLarge = `row__poster ${islargeRow && 'row__posterLarger'}`

  const imgdiv =
    movies.map((movie, index) => (

      <img
        className={classLarge}
        key={index}
        src={`${base_url}${islargeRow ? movie.poster_path : movie.backdrop_path}`} 
        alt={movie.name}
        onClick={() => handleClick(movie)}
      />

    ))

  const handleClick = (movie) => {
    if (trailerUrl) {
      alert('already running')
      // setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_name || movie?.title || "")
        .then((url) => {
          const Url = new URL(url)
          const searchParams = new URLSearchParams(Url.search);
          setTrailerUrl(searchParams.get("v"));

        })
        .catch((error) => console.log(error));
    }
  };



  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,

    },
  };

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row__posters'>
        {imgdiv}
      </div>

      <div className="row__youtube">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

    </div>
  )
}

export default Row