import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { data } from "../data/markers"

const wrapper = {
    height: '100vh',
    width: '100vw'
  }

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 37.7759,
            lng: -122.4194,
            zoom: 13,
            markers: data
        };
    }


    render() {
        return (
            <MapContainer style={wrapper} center={[40.4406, -79.9959]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  
                <MarkerClusterGroup>
                    {
                    this.state.markers.map((marker) => {
                        return (<Marker position={[marker.lat, marker.long]} />);
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        )
    }
 }
 
 export default Map