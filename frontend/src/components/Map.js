import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import '../App.css';
import bikeImage from './images/Bike.png';
import carImage from './images/Car.png';
import personImage from './images/Person.png';

const wrapper = {
    height: '100vh',
    width: '100vw-200px'
  }

const getIcon = function(marker) {
    if (marker.label === 0) return generateIcon(carImage, marker.count);
    if (marker.label === 1) return generateIcon(personImage, marker.count);
    return generateIcon(bikeImage, marker.count);
}

const generateIcon = function(image, count) {
    return new L.DivIcon({
        html: '<div class="container"><img src='+ image +' style="width:100%;"><div class="centered">'+count+'</div></div>',
        iconSize: L.point(30, 30, true),
        className: 'cluster'
    });
}

const createClusterCustomIcon = function (cluster) {
    var count = 0;
    cluster.getAllChildMarkers().map((child) => {
        count += child.options.count;
    });

    return L.divIcon({
        html: `<span>${count}</span>`,
        iconSize: L.point(40, 40, true),
        className: 'cluster'
    });
}

export const TrafficMap = ({markers}) => {    
    return (
        <MapContainer style={wrapper} center={[40.4406, -79.9959]} zoom={14}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {
                    markers.map((marker) => {
                        return (
                            <Marker 
                                count={marker.count}
                                position={[marker.lat, marker.long]}
                                icon={getIcon(marker)}
                            >
                                <Popup>{marker.lat}, {marker.long}, {marker.count}</Popup>
                            </Marker>
                        );
                    })
                }
            </MarkerClusterGroup>
        </MapContainer>
    )
};
