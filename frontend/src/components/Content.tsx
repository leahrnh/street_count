import React from 'react';
import styled from '@emotion/styled';
import Map from './Map'


const ContentPanel = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-column-gap: 0px;
`

const SidePanel = styled.div`
  background-color: #eeeeee;
`

const DataPanel = styled.div`
  display: grid;
  grid-template-rows: 50px 50px 50px 1fr;
  grid-row-gap: 10px;
`


const Info = () => {
  return (
    <SidePanel>
      <p>Info and Directions</p>
    </SidePanel>
  )
};


const Data = () => {
  return (
    <DataPanel>
        <div>
            <h3>Traffic Stats</h3>
        </div>
        <div>
            <h3>Pedestrian / Bike / Car</h3>
        </div>
        <div>
            <h3>Daily Activity</h3>
        </div>
        <Map/>
    </DataPanel>
  )
};

export const Content = () => {
  return (
    <ContentPanel>
      <Info/>
      <Data/>
    </ContentPanel>
  )
};