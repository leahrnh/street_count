import React from 'react';
import styled from '@emotion/styled';

const SidePanel = styled.div`
  float: left;
  width: 200px;
  min-height: 600px;
  background-color: #eeeeee;
`
const InfoPanel = () => {
  return (
    <SidePanel>
      <p>Info and Directions</p>
    </SidePanel>
  )
};

const DataPanel = () => {
  return (
    <div>
      <div>
        <h3>Traffic Stats</h3>
      </div>
      <div>
        <h3>Pedestrian / Bike / Car</h3>
      </div>
      <div>
        <h3>Pedestrian / Bike / Car</h3>
      </div>
      <div>
        <h1>Map goes here.</h1>
      </div>
    </div>
  )
};

export const Content = () => {
  return (
    <div>
      <InfoPanel/>
      <DataPanel/>
    </div>
  )
};