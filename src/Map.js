/*global google*/
import React from "react";
import logo from "./homeicon.png";
import {
  compose,
  withProps,
  withHandlers,
  withState,
  withStateHandlers
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

/*Container of the map*/
const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgMc3lK9xoXnlYBH3t2JNkCJxGuF0nN_Y&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withState("places", "updatePlaces"),
  withHandlers(() => {
    const refs = {
      map: undefined
      
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },

      /* nearBySearch function of Google Places API */
      fetchPlaces: ({ updatePlaces }) => {
        let places;
        const bounds = refs.map.getBounds();
        const service = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        
        const request = {
          location: {
            lat: refs.map.props.defaultPosition.lat,
            lng: refs.map.props.defaultPosition.lng
          },
          radius: 500,
          type: ["restaurant"]
        };
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < 20; i++) {
              //console.log(results);
              updatePlaces(results);
            }
          }
        });
      }
    };
  })
)(props => {
  return (
    <GoogleMap
      //ref={props.onMapMounted}
      onTilesLoaded={props.fetchPlaces}
      ref={props.onMapMounted}
      defaultZoom={15}
      defaultCenter={{
        lat: props.currentLocation.lat,
        lng: props.currentLocation.lng
      }}
      //center={props.currentLocation}
      defaultPosition={props.currentLocation}
    >
      {props.isMarkerShown && (
        <Marker
          options={{ icon: "https://i.imgur.com/9G5JOp8.png" }}
          position={{
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng
          }}
          onClick={props.onMarkerClick}
        />
      )}

      {props.places &&
        props.places.map((place, i) => (
          <Marker
            key={i}
              position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            // label={place.name}
            label={i.toString()}
            onClick={props.onToggleOpen}
          >
            {props.isOpen && (
             /*infowindow to display the restaurants name and address*/
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  <h3>
                    {place.name}
                    {"\n"}
                  </h3>
                  <p>{place.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  );
});

export default Map;
