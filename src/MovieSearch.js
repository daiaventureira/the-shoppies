import React, {Component} from 'react';
import axios from 'axios';

class MovieSearch extends Component{
    constructor(props){
        super(props);
        
        this.getData = this.getData.bind(this);
        this.searchMovie = this.searchMovie.bind(this);

        this.state = {
            data: [],
            search: '',
        }
    }
    searchMovie(e) {
        this.setState({ search: e.target.value.trim() + "*" });
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
            </div>
        )
    }
}
export default MovieSearch;