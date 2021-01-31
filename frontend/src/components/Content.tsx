import React from 'react';
import styled from '@emotion/styled';
import Map from './Map';
import {AddressSelector, DataFilter} from './Filters';

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

const FilterPanel = styled.div`
  align-items: center;
  margin: auto;
  width: 98%;
  height: 50px;
`

const BorderedFilterPanel = styled(FilterPanel)`
  border: 2px solid #dddddd;
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
        <FilterPanel>
            <AddressSelector/>
        </FilterPanel>
        <BorderedFilterPanel>
            <DataFilter/>
        </BorderedFilterPanel>
        <BorderedFilterPanel>
            <h3>Daily Activity</h3>
        </BorderedFilterPanel>
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