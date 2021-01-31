import React from 'react';
import styled from '@emotion/styled';


const Button = styled.button`
  margin: 10px;
`

const MenuButtons = styled.div`
  text-align: left;
  background-color: #cccccc;
`

export const Menu = () => {
    return (
      <MenuButtons>
        <Button>Contribute Data</Button>
        <Button>Build Report</Button>
      </MenuButtons>
    )
};
