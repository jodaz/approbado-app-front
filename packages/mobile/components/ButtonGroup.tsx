import * as React from 'react'
import styled from 'styled-components/native'
import { IComp } from '../types';

const ButtonContainer = styled.View`
    flexDirection: column;
    justifyContent: space-between;
    margin-top: 40px;
`

const ButtonGroup = ({ children }: IComp) : JSX.Element => {
    return (
        <ButtonContainer>
            {children}
        </ButtonContainer>
    );
}

export default ButtonGroup
