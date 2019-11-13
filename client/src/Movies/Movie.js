import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";
import { Link, NavLink } from "react-router-dom";

const Movie = (props) => {
  const [movie, setMovie] = useState();
//  console.log(props)
// is out here so it can be a dependency
const id = props.match.params.movieID;

  // was going here to fetch the movie
  useEffect(() => {
    // console.log(props)
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[id]);
  // const makeURL = (movie) => {
  
  //   console.log("movie", `/movies/${movie.id}`)
  //   return `/movies/${movie.id}`
  // }
  
  // Not sure why I'm using saveMovie to do what addToSavedList does
  // The movie titles show up in both cases
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    // console.log("saving", movie)
    // addToSavedList(movie)
    addToSavedList(<NavLink activeClassName='active' to={`/movies/${movie.id}`}>
      {movie.title}
      </NavLink>)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">

      <MovieCard key = {movie.id} movie = {movie}/>

      <div className="save-button" onClick={() => saveMovie()}>Save</div>

    </div>

  );
}

export default Movie;
