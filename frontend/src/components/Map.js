import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { data } from "../data/markers";
import L from 'leaflet';

const wrapper = {
    height: '100vh',
    width: '100vw'
  }

  const createClusterCustomIcon = function (cluster) {
    var count = 0;
    cluster.getAllChildMarkers().map((child) => {
        count += child.options.count;
    });

    return L.divIcon({
      html: `<span>${count}</span>`,
      iconSize: L.point(40, 40, true),
      className: 'leaflet-div-icon'
    });
  }

  const updateState = function(startDate, endDate) {
      if (!startDate) {
          endDate = new Date();
          startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
      }

      return [...data.filter(marker => {
          var d = new Date(marker.date);
          return d >= startDate && d <= endDate
        })];
  }

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 37.7759,
            lng: -122.4194,
            zoom: 13,
            markers: updateState()
        };
    }

    render() {
        return (
            <MapContainer style={wrapper} center={[40.4406, -79.9959]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  
                <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                    {
                    this.state.markers.map((marker) => {
                        return (
                        <Marker 
                            count={marker.count}
                            position={[marker.lat, marker.long]}
                            eventHandlers={{
                                click: (marker) => {
                                    console.log(marker.position);
                                }
                            }}
                        >
                            <Popup>{marker.lat}, {marker.long}, {marker.count}
                            </Popup>
                        </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        )
    }
 }
 
 export default Map