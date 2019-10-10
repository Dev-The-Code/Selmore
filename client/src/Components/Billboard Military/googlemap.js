import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
            showingInfoWindow: true,
            activeMarker: '',
            position: null
        };
        this.getCurrPosition = this.getCurrPosition.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }
    componentWillMount() {
        this.setPosition();
    }
    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            this.setState({
                coords:
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
            });

        })
    }
    getCurrPosition({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }
    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }
    render() {
        const { coords } = this.state;

        return (
            <div>
                {coords &&
                    <MyMapComponent
                        isMarkerShown
                        bootstrapURLKeys={{ key: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo' }}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `75vh` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        coords={coords}
                        onInfoWindowClose={this.onInfoWindowClose}
                        address={this.props.address}
                    // getCurrentPosition={this.getCurrPosition}
                    // position = {position}
                    />
                }
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={15}
        // defaultCenter={{ lat: props.position.latitude, lng: props.position.longitude }}
        // center={{ lat: 33.690980, lng: 73.091140 }}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}

    >

        {props.isMarkerShown && <Marker
            position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            title={props.address}
            // name='Awaisjbhjbh'
            // text='rehman'
            // key='arain'
            // position={{ lat: 33.690980, lng: 73.091140 }}
            draggable={true}
            onDragEnd={position => {
                // console.log(position.latLng.lat(), position.latLng.lng());
                props.getCurrentPosition({ latitude: position.latLng.lat(), longitude: position.latLng.lng() });
                // console.log(position)
                // console.log(position, 'position')
            }}
        >
            <InfoWindow
                // onCloseClick={() => { this.props.onInfoWindowClose }}
                // marker={this.state.activeMarker}
                // visible={this.state.showingInfoWindow}
                onCloseClick={props.onInfoWindowClose}
            >
                <div>
                    {props.address}
                </div>
            </InfoWindow>
        </Marker>
        }
    </GoogleMap>
))
export default Location;

