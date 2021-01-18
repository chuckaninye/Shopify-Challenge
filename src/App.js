import React, {useState, useEffect} from 'react'
import MovieList from './components/MovieList'
import './App.css'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'

function App () {
  const [movies, setMovies] = useState([])
  const [nominations, setNominations] = useState([])
  const [searchValue, setSearchValue] = useState('django')
  const [state, setState] = useState(false)

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cdf468f0` 

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
  }
 
  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieNomintaions = JSON.parse(localStorage.getItem('shoppies-nominations'))

    setNominations(movieNomintaions)
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('shoppies-nominations', JSON.stringify(items))
  }
  const addNominations = (movie) => {
    if(nominations.includes(movie)){
      alert("Movie already added")
    }
    else{
      const newNominationsList = [...nominations, movie]
      setNominations(newNominationsList)
      saveToLocalStorage(newNominationsList)
    }
    

  }

  useEffect(() => {
    if(nominations.length === 5){
      alert("You have selected 5 nominees")
      setState(true)
    }
    else if(nominations.length < 5) {
      setState(false)
    }
  }, [nominations])

  const removeNominations = (movie) => {
    const newNominationsList = nominations.filter((nomination) => nomination.imdbID !== movie.imdbID)

    setNominations(newNominationsList)
     saveToLocalStorage(newNominationsList)
  }

  return (
    <div className="container-fluid movie-app">
      <div className="heading-row">
        <MovieListHeading className="column" heading="The Shoppies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies={movies} handleNominationsClick={addNominations} buttonText="Nominate" disableCondition={state}/>
      </div>
      <div className="row">
        <MovieListHeading heading="Nominations"/>
      </div>
      <div className="row">
        <MovieList movies={nominations} handleNominationsClick={removeNominations} buttonText="Remove"/>
      </div>
    </div>
  );

}

export default App;
