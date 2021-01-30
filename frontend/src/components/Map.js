import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const wrapper = {
    height: '100vh',
    width: '100vw'
  }

class Map extends Component {
    state = {
        lat: 37.7759,
        lng: -122.4194,
        zoom: 13,
    };
    render() {
        return (
            <MapContainer style={wrapper} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )
    }
 }
 
 export default Map