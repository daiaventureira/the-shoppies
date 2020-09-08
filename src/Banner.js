import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <div className="father-content">
        <div className="right-border"></div>

        <div className="main-content">
          <div className="title">
            <h1>The Shoppies</h1>
          </div>
          <div className="banner">
            You already nominated 5 movies. Thank you!
          </div>
        </div>
        <div className="left-border"></div>
      </div>
    );
  }
}
export default Banner;
