import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        maxWidth: '700px',
        minWidth: '200px',
    },

    progress: {
        marginTop: '110px',
        marginBottom: '110px',
    },
});


class Map extends Component {
    constructor() {
        super();

        this.state = {
            coords: null
        };

        this.getCurrPosition = this.getCurrPosition.bind(this);
    }


    componentWillMount() {
        //render a funtion for position
        this.setPosition();
    }



    setPosition() {
        //get latitude & longitude
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                coords:
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });
        })
    }

    getCurrPosition({ latitude, longitude }) {

        this.setState({ coords: { latitude, longitude } })
        var location = localStorage.setItem('coords', JSON.stringify(this.state.coords));
    }


    render() {
        const { coords } = this.state;
        return (
            <div>
                <div>
                    {
                        coords ? <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `40vh` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            coords={coords}
                            getCurrentPosition={this.getCurrPosition}
                        />
                            :
                            <center>
                            </center>
                    }
                </div>
            </div>
        )
    }
}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        // defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            draggable={true}
            onDragEnd={position => {
                props.getCurrentPosition({ latitude: position.latLng.lat(), longitude: position.latLng.lng() });
            }} />}
    </GoogleMap>
))



Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Map;
