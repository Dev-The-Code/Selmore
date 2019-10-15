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
        console.log(navigator, 'navigator')
        console.log(this.props.longitude, 'longitude')
        console.log(this.props.latitude, 'latitude')

        let latitude = Number(this.props.latitude)
        let longitude = Number(this.props.latitude)

        // let latitude = this.props.latitude
        // let longitude = this.props.latitude
        // navigator.geolocation.getCurrentPosition(position => {
        // console.log(position)
        this.setState({
            coords:
            {
                latitude: latitude,
                longitude: longitude,
            },
        });

        // })
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
        console.log(coords, 'coords')

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>

            <GoogleMap
            defaultCenter ={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            defaultZoom={15}
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







// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class Location extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             center: null
//         }
//     }

//     // componentWillMount() {
//     //     console.log(navigator, 'navigator')
//     //     console.log(this.props.longitude, 'longitude')
//     //     console.log(this.props.latitude, 'latitude')

//     //     // let latitude = Number(this.props.latitude)
//     //     // let longitude = Number(this.props.latitude)

//     //     let latitude = this.props.latitude
//     //     let longitude = this.props.latitude
//     //     // console.log(position)
//     //     this.setState({
//     //         center:
//     //         {
//     //             latitude: latitude,
//     //             longitude: longitude,
//     //         },
//     //     });
//     // }
//     // static defaultProps = {

//     //     center: {
//     //         lat: 59.95,
//     //         lng: 30.33
//     //     },
//     //     zoom: 11
//     // };

//     render() {
//         const { center } = this.props;
//         console.log(center, 'center')
//         return (
//             // Important! Always set the container height explicitly
//             <div style={{ height: '100vh', width: '100%' }}>
//                 {center &&
//                     <GoogleMapReact
//                         bootstrapURLKeys={{ key: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo' }}
//                         defaultCenter={center.center}
//                         defaultZoom={10}
//                         // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//                     >
//                         {/* <AnyReactComponent
//                             lat={center.latitude}
//                             lng={center.longitude}
//                             text="My Marker"
//                         /> */}
//                     </GoogleMapReact>
//                 }
//             </div>
//         );
//     }
// }

// export default Location;






// import React, { Component } from 'react';
// import { GoogleApiWrapper, InfoWindow, Marker , Map} from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// export class Location extends Component {

//   render() {
//       console.log(this.props.google , 'this.props.google')
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//          lat: -1.2884,
//          lng: 36.8233
//         }}
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo'
// })(Location);


// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import React, { Component } from 'react';

// export class Location extends Component {
//     constructor(props) {
//         super(props);


//     }
//     render() {
//         let latitude = Number(this.props.latitude)
//         let longitude = Number(this.props.latitude)
//         return (
//             <Map
//                 google={this.props.google}
//                 zoom={8}
//                 // style={mapStyles}
//                 initialCenter={{ lat: latitude, lng: longitude }}
//             >
//             </Map>
//         );
//     }
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo'
// })(Location);
