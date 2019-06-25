import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker, } from 'google-maps-react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class Location extends Component {
    static defaultProps = {
        center: {
            lat: 24.662618,
            lng: 67.489014
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                // lat={24.509642}
                // long={67.280273}
                // marker = new google.maps.Marker({
                //     position: myLatLng,
                //     map: map,
                //     title: 'Hello World!'
                //   });
                >
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        // position={{ lat: location.lat(), lng: location.lng() }}
                        position={{ lat: 24.509642, lng: 67.280273 }}
                        icon={{
                            url: "./custom_icon.png",
                        }}
                    />
                    {/* <Marker
            lat={24.509642}
            lng={67.280273}
            text="My Marker" */}
                    {/* /> */}
                </GoogleMapReact>
                {/* <GoogleMap
                    defaultZoom={18}
                    defaultCenter={{ lat: 24.509642, lng: 67.280273 }}
                >
                    {true && <Marker onPositionChanged={() => {
                        // This event will trigger the 
                        // call to update the state where lat and lng will go.

                    }} draggable position={{ lat: 24.509642, lng: 67.280273 }} />}
                </GoogleMap> */}
                {/* <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
                    <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} />
                </GoogleMap> */}
            </div>
        );
    }
}

export default Location;