import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieList = props => {

  // searchTerm will save the data from the search input on every occurance of the change event.

  const [searchTerm, setSearchTerm] = useState("")

  // searchResults is used to set the search result.
  const [searchResults, setSearchResults] = useState([])
  
  let moviesLoaded = false
  const [movies, setMovies] = useState([])
  // The 2 useEffects will race each other
  // We only want the useEffect to do something if the movies are in a certain state
  useEffect(() => {

    //  when this is called is less relevant than what is being saved
     if(movies.length === 0) {
      const getMovies = () => {
        axios
          .get('http://localhost:5000/api/movies')
          .then(response => {
            setMovies(response.data);
            setSearchResults(response.data)
            // console.log("setup", searchResults)
          })
          .catch(error => {
            console.error('Server Error', error);
          });
      }
      
      getMovies();
    //   moviesLoaded = true
    }
    
  }, [searchTerm]);


  useEffect(() => {

    // console.log(moviesLoaded)
    // if(moviesLoaded) {
      if(movies.length > 0) {
      setSearchResults(movies)
      // will need to make sure the useEffect only searches for data when there are movies to filter
        // console.log("here")
        // console.log(searchResults)
    
        if(searchResults.length > 0) {
          // console.log("can filter", searchResults, searchTerm)
          const results = searchResults.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
          console.log(results)
          // filtered set of movies
          setSearchResults(results)
          // moviesLoaded = false
        }
    }
    
  },[searchTerm]);

  const handleChange = event => {
      // console.log(event.target.value)
    // triggers the useEffect
    setSearchTerm(event.target.value)
  }
  return (
    <div className="movie-list">
        {/* put form here */}
      <form>
        {/* We apply two-way data binding to the input field, which basically takes the value from the user and saves it into the state. */}
        {/* Two-way binding just means that:
        When properties in the model get updated, so does the UI.
        When UI elements get updated, the changes get propagated back to the model. */}
        <label htmlFor="name">Search:</label>
        <input
          id="name"
          type="text"
          name="textfield"
          placeholder="Search"

          // part 2
          value={searchTerm}

          // part 1
          onChange={handleChange}
        />
        
      </form>
      {searchResults.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  // console.log(movie)
  // const { title, director, metascore, stars } = movie;
  return (
    <Link to={`/movies/${movie.id}`}>

      <MovieCard movie = {movie}/>
      
    </Link>

  );
}

export default MovieList;
