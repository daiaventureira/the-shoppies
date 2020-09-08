import React, {Component} from 'react';
import axios from 'axios';

class MovieSearch extends Component{
    constructor(props){
        super(props);
        
        this.getData = this.getData.bind(this);
        this.searchMovie = this.searchMovie.bind(this);
        this.selectMovie = this.selectMovie.bind(this);

        this.state = {
            data: [],
            search: '',
            selectedMovies: [],
        }
    }
    searchMovie(e) {
        this.setState({ search: e.target.value.trim() + "*" });
      }
      selectMovie(movie) {
        this.setState((state, props) => {
          state.selectedMovies.push(movie);
          return { selectedMovies: state.selectedMovies };
        });
      }

    getData(e){
        e.preventDefault(); 

        axios
        .get("http://www.omdbapi.com/?apikey=6138a57",{
        params:{
            s:this.state.search,
        },
        })
        .then((res) => {
            const data = res.data.Search;
            this.setState({ data });
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        const datas = [];
    const data = this.state.data;

    if (data === undefined) {
      datas.push(<div>no results found</div>);
    } else {
      let x = data.length;
      if (x > 5) {
        x = 5;
      }

      for (let i = 0; i < x; i++) {
        let isDisabled = false;
        for (let k = 0; k < this.state.selectedMovies.length; k++) {
          if (this.state.selectedMovies[k].imdbID === data[i].imdbID) {
            isDisabled = true;
          }
          if (this.state.selectedMovies.length === 5) {
            return <div>thanks</div>
            
          }
        }
        if (data[i].Title.length >= 30) {
          datas.push(
            <ul>
              <li>
                {data[i].Title.substr(0, 30) +
                  "..." +
                  "(" +
                  data[i].Year +
                  ") "}
                <button
                  className='button-nominate-remove'
                  onClick={() => this.selectMovie(data[i])}
                  disabled={isDisabled}
                >
                  Nominate
                </button>
              </li>
            </ul>
          );
        } else {
          datas.push(
            <ul>
              <li>
                {data[i].Title.substr(0, 30) + "(" + data[i].Year + ") "}
                <button
                  className='button-nominate-remove'
                  onClick={() => this.selectMovie(data[i])}
                  disabled={isDisabled}
                >
                  Nominate
                </button>
              </li>
            </ul>
          );
        }
      }
    }

        return(
            <div>
               <form
                autoComplete="off"
                onKeyUp={this.getData}
                onSubmit={(e) => e.preventDefault()}
              >
                <label>
                  <input
                    className="input-search"
                    type="text"
                    name="movie"
                    placeholder=" type the name of the movie"
                    onChange={this.searchMovie}
                  />
                </label>
              </form>
              <div className='datas'>{datas}</div>
            </div>
        )
    }
}
export default MovieSearch;