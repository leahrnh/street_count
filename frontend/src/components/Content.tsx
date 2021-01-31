import React, {useState} from 'react';
import styled from '@emotion/styled';
import {TrafficMap} from './Map';
import {AddressSelector, DataFilter} from './Filters';
import { data } from "../data/markers";
import { realData } from "../data/real-markers";
import Example from './charts'

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
  grid-template-rows: 50px 50px 200px 1fr;
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
  padding-bottom: 0px;
  button {
      float: left;
      box-sizing: border-box;
      margin: 15px 5px;
      background-color: #dddddd;
      border-radius: 5px;
      text-decoration:none; 
  }
`

const ChartPanel = styled.div`
    align-items: center;
    margin: auto;
    width: 98%;
    height: 200px;
`

const Info = () => {
  return (
    <SidePanel>
      <p>Info and Directions</p>
    </SidePanel>
  )
};

const Data = () => {
    const [dataSource, setDataSource] = useState(realData);
    const [markers, setMarkers] = useState(dataSource);
    
    const updateDataSource = (source: string) => {
        if(source === 'real') {
            setDataSource(realData);
        }
        else {
            setDataSource(data);
        }
        setMarkers(dataSource);
    }

    const updateMarkers = (options: any) => {        
        const newMarkers = [...dataSource]
        setMarkers(
            [...newMarkers.filter((marker: any) => {
                const d = new Date(marker.date);
                return options.active[marker.label] && d >= options.startDate && d <= options.endDate;  
            })]
        );
    } 

    return (
        <DataPanel>
            <FilterPanel>
                <AddressSelector updateDataSource={updateDataSource}/>
            </FilterPanel>
            <BorderedFilterPanel>
                <DataFilter updateMarkers={updateMarkers}/>
            </BorderedFilterPanel>
            <ChartPanel>
                <Example/>
            </ChartPanel>
            <TrafficMap markers={markers}/>
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