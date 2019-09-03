// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { Marker, } from 'google-maps-react';
// // import {
// //     withGoogleMap,
// //     GoogleMap,
// //     Marker,
// // } from "react-google-maps";
// class Location extends Component {
//     static defaultProps = {
//         center: {
//             lat: 24.662618,
//             lng: 67.489014
//         },
//         zoom: 11
//     };
//     render() {
//         return (
//             // Important! Always set the container height explicitly
//             <div style={{ height: '100vh', width: '100%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo' }}
//                     defaultCenter={this.props.center}
//                     defaultZoom={this.props.zoom}
//                 // lat={24.509642}
//                 // long={67.280273}
//                 // marker = new google.maps.Marker({
//                 //     position: myLatLng,
//                 //     map: map,
//                 //     title: 'Hello World!'
//                 //   });
//                 >
//                     {/* <Marker
//                         title={'The marker`s title will appear as a tooltip.'}
//                         name={'SOMA'}
//                         // position={{ lat: location.lat(), lng: location.lng() }}
//                         position={{ lat: 24.509642, lng: 67.280273 }}
//                         icon={{
//                             url: "./custom_icon.png",
//                         }}
//                     /> */}
//                     <Marker
//                         lat={24.509642}
//                         lng={67.280273}
//                         text="My Marker"
//                     />
//                 </GoogleMapReact>
//                 {/* <GoogleMap
//                     defaultZoom={18}
//                     defaultCenter={{ lat: 24.509642, lng: 67.280273 }}
//                 >
//                     {true && <Marker onPositionChanged={() => {
//                         // This event will trigger the
//                         // call to update the state where lat and lng will go.

//                     }} draggable position={{ lat: 24.509642, lng: 67.280273 }} />}
//                 </GoogleMap>
//                 <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//                     <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} />
//                 </GoogleMap> */}

//             </div>
//         );
//     }
// }

// export default Location;
// // export default MapWithAMarker = withGoogleMap(props =>
// //     <GoogleMap
// //         defaultZoom={8}
// //         defaultCenter={{ lat: -34.397, lng: 150.644 }}
// //     >
// //         <Marker
// //             position={{ lat: -34.397, lng: 150.644 }}
// //         />
// //     </GoogleMap>
// // );

// // <MapWithAMarker
// //     containerElement={<div style={{ height: `400px` }} />}
// //     mapElement={<div style={{ height: `100%` }} />}
// // />
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
            showingInfoWindow: true,
            activeMarker: '',
            position:null
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
                    // latitude: this.props.latitude,
                    // longitude: this.props.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
                // position:{
                //      latitude: this.props.latitude,
                //     longitude: this.props.longitude,
                // }
                
            });
            
        })
    }
    getCurrPosition({ latitude, longitude }) {
        //  console.log(latitude,'ssssssssssssss')
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
        //   console.log(coords)
        // console.log(this.props.latitude, this.props.longitude , 'props')

        return (
            <div>
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
                console.log(position)
                console.log(position, 'position')
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

// export default MyMapComponent({
//     apiKey: 'AIzaSyAV77zKJtP5MeEAFIgi3YhdgIzsuYKBuxo'
//   })(Location);
