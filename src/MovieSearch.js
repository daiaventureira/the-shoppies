import React, { Component } from "react";
import axios from "axios";
import movieSearch from "./CssFiles/movieSearch.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Banner from "./Banner";

const api_key = process.env.REACT_APP_API_KEY;

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);

    this.state = {
      data: [],
      search: "",
      selectedMovies: [],
    };
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
  removeMovie(movie) {
    this.setState({
      selectedMovies: this.state.selectedMovies.filter(
        (item) => item.imdbID !== movie.imdbID
      ),
    });
  }

  getData(e) {
    e.preventDefault();
    axios
      .get(`//www.omdbapi.com/?apikey=${api_key}`, {
        params: {
          s: this.state.search,
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
  render() {
    const datas = [];
    const data = this.state.data;
    if (data === undefined) {
      datas.push(<div key={datas}>no results found</div>);
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
            return <Banner />;
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
                  className="button-nominate-remove"
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
            <ul key={i}>
              <li>
                {data[i].Title.substr(0, 30) + "(" + data[i].Year + ") "}
                <button
                  className="button-nominate-remove"
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

    const nominate = [];
    for (let i = 0; i < this.state.selectedMovies.length; i++) {
      if (this.state.selectedMovies[i].Title.length >= 30) {
        nominate.push(
          <ul>
            <li>
              {this.state.selectedMovies[i].Title.substr(0, 30) +
                "..." +
                "(" +
                this.state.selectedMovies[i].Year +
                ") "}
              <button
                className="button-nominate-remove"
                onClick={() => this.removeMovie(this.state.selectedMovies[i])}
                selectedMovies={this.state.selectedMovies}
              >
                Remove
              </button>
            </li>
          </ul>
        );
      } else {
        nominate.push(
          <ul key={nominate}>
            <li>
              {this.state.selectedMovies[i].Title.substr(0, 30) +
                "(" +
                this.state.selectedMovies[i].Year +
                ") "}
              <button
                className="button-nominate-remove"
                onClick={() => this.removeMovie(this.state.selectedMovies[i])}
                selectedMovies={this.state.selectedMovies}
              >
                Remove
              </button>
            </li>
          </ul>
        );
      }
    }
    return (
      <div className="father-content">
        <div className="right-border"></div>

        <div className="main-content">
          <div className="title">
            <h1>The Shoppies</h1>
          </div>
          <div className="search-and-subtitle">
            <div className="movies-table">
              <form
                autoComplete="off"
                onKeyUp={this.getData}
                onSubmit={(e) => e.preventDefault()}
              >
                <label>
                  <FontAwesomeIcon icon={faSearch} />
                  <input
                    className="input-search"
                    type="text"
                    name="movie"
                    placeholder=" type the name of the movie"
                    onChange={this.searchMovie}
                  />
                </label>
              </form>
              <div className="datas">{datas}</div>
            </div>
            <div className="nominated-movies">
              <h3>Nominations:</h3>
              <div className="nominations">{nominate}</div>
            </div>
          </div>
        </div>

        <div className="left-border"></div>
      </div>
    );
  }
}
export default MovieSearch;
