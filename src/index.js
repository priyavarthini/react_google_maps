import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/App";
import registerServiceWorker from "./registerServiceWorker";
//import GeoLocation from "../Geolocation";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
