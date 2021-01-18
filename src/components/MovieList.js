 import React from 'react'
 const MovieList = (props) => {
    return (
    <>
      {props.movies.map((movie, index) => (
          <div className={props.class} key={index}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt=""/>
            <h3>{movie.Year}</h3>
            <button onClick={() => props.handleNominationsClick(movie)} disabled={props.disableCondition}>{props.buttonText}</button> 
          </div>
      ))}
     </>
     )
 }

 export default MovieList