import React, { useState } from 'react';
import styled from '@emotion/styled';
import { data } from "../data/markers";

const AddressSelectorPanel = styled.div`
    h3 {
        float: left;
        padding-left: 5px;
    }
    form {
        padding: 20px 0px;
        float: right;
    }
`

// const FilterButton = ({name: str, label: number}) => {
//     const [active, setActive] = useState(true);

//     return (
//         <button onClick={() => handleClick(1)}>Pedestrian</button>
//     )

    
// }

const FilterButton = styled.button`
     display:inline-block;
     padding:0.3em 1.2em;
     margin:0 0.3em 0.3em 0;
     border-radius:2em;
     box-sizing: border-box;
     text-decoration:none;
     font-family:'Roboto',sans-serif;
     font-weight:300;
     color:#FFFFFF;
     background-color:#4eb5f1;
     text-align:center;
     transition: all 0.2s;
    }
    a.button3:hover{
     background-color:#4095c6;
    }
`

export class AddressSelector extends React.Component<{updateDataSource: any}, { value: string, dataSource: string }> {
    constructor(props: any) {
        super(props);
        this.state = {value: '', dataSource: 'fake'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.setState({dataSource: this.state.dataSource === 'real' ? 'fake' : 'real'})
        this.props.updateDataSource(this.state.dataSource);
    } 

    render() {
        return (
            <AddressSelectorPanel>
                <h3>Traffic Stats</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value={"Go"} />
                </form>
            </AddressSelectorPanel>
        )
    }
};

export const DataFilter = ({updateMarkers}: any) => {
    const [active, setActive] = useState([true, true, true]);

    const handleClick = (label: number) => {
        active[label] = !active[label];
        setActive(active);

        const endDate = new Date();
        const startDate = new Date(2020, 0, 0);
        const options = {
            active: active,
            endDate: endDate,
            startDate: startDate
        }
        updateMarkers(options);
    }

    return (
        <div>
            <button onClick={() => handleClick(1)}>Pedestrian</button>
            <button onClick={() => handleClick(2)}>Bike</button>
            <button onClick={() => handleClick(0)}>Car</button>
        </div>
    )
  };
