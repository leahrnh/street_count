import React from 'react';
import styled from '@emotion/styled';

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

export class AddressSelector extends React.Component<{}, { value: string }> {
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

export const DataFilter = () => {
    return (
        <div>
            <button>Pedestrian</button>
            <button>Bike</button>
            <button>Car</button>
        </div>
    )
  };
