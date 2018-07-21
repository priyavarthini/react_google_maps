import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import Map from "./Map";

/*Default values for Map*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 1.3467182,
        lng: 103.8496971
      },
      isMarkerShown: false
    };
  }
  
/*Geolocation Function to fetch the current location*/
  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        }));
      });
    } else {
      error => console.log(error);
    }
  };

  componentDidMount() {
    this.showCurrentLocation();
  }

/*The state of the current location and the marker are passed to the Map component*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Restaurants Nearby App</h1>
          <p> By Priyavarthini </p>
        </header>
        <Map
          isMarkerShown={this.state.isMarkerShown}
          currentLocation={this.state.currentLatLng}
        />
      </div>
    );
  }
}

export default App;
//render(<App />, document.getElementById("root"));
