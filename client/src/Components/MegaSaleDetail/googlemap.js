import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
            showingInfoWindow: true,
            activeMarker: '',
            position: null,
        };
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }
    componentWillMount() {
        this.setPosition();
    }
    setPosition() {
        let latitude = Number(this.props.latitude)
        let longitude = Number(this.props.longitude)
        let mapFalse = this.props.mapFalse;
        if (mapFalse) {
            this.setState({
                coords:
                {
                    latitude: latitude,
                    longitude: longitude,
                    mapFalse: false
                },
            });
        }
        this.props.mapfalse(false)
    }


    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    render() {
        const { coords } = this.state;
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>

            <GoogleMap
                defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                defaultZoom={12}
            >
                {props.isMarkerShown && <Marker
                    position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                    title={props.address}
                >
                    <InfoWindow
                        onCloseClick={props.onInfoWindowClose}
                    >
                        <div>
                            {props.address}
                        </div>
                    </InfoWindow>
                </Marker>
                }
            </GoogleMap>
        ));
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
                    />
                }
            </div>
        )
    }
}

export default Location;