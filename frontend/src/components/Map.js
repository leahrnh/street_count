import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { data } from "../data/markers";
import { realData } from "../data/real-markers";
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

  const updateState = function(isReal, labels, startDate, endDate) {
      if (!startDate) {
          endDate = new Date();
          startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
      }

      if(isReal)
        return [...realData.filter(marker => filter(marker, labels, startDate, endDate))];
      return [...data.filter(marker => filter(marker, labels, startDate, endDate))];
  }

  const filter = function(marker, labels, startDate, endDate) {
    var d = new Date(marker.date);
    var labelsMatch = (labels === undefined || labels.length === 0) || hasLabel(labels, marker.label);
    return d >= startDate && d <= endDate && labelsMatch;
  }

  const hasLabel = function(labels, labelValue) {
      var label;
      if (labelValue === 0) label = "Car";
      else if (labelValue === 1) label = "Person";
      else label = "Bike";

      return labels.includes(label);
  }

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 37.7759,
            lng: -122.4194,
            zoom: 13,
            markers: updateState(true, [], new Date(2020, 9, 1), new Date(2020, 10, 31))
            //markers: updateState()
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
                            icon={getIcon(marker)}
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