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

export class AddressSelector extends React.Component<{updateMarkers: any}, { value: string }> {
    constructor(props: any) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        this.props.updateMarkers(data);
        alert(this.state.value);
        event.preventDefault();
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
