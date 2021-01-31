import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Sun', Pedestrian: 2635, Bike: 1562, Car: 6985,
  },
  {
    name: 'Mon', Pedestrian: 450, Bike: 320, Car: 2210,
  },
  {
    name: 'Tues', Pedestrian: 600, Bike: 286, Car: 2290,
  },
  {
    name: 'Wed', Pedestrian: 120, Bike: 98, Car: 3600,
  },
  {
    name: 'Thurs', Pedestrian: 560, Bike: 356, Car: 2181,
  },
  {
    name: 'Fri', Pedestrian: 1560, Bike: 256, Car: 2500,
  },
  {
    name: 'Sat', Pedestrian: 3490, Bike: 1532, Car: 5625,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

  render() {
    return (
      <BarChart
        width={1000}
        height={200}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Car" stackId="a" fill="#00000" />
        <Bar dataKey="Pedestrian" stackId="a" fill="#8884d8" />
        <Bar dataKey="Bike" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}
