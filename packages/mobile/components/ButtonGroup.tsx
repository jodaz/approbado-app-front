import * as React from 'react'
import { Dimensions } from 'react-native';
import { IComp } from '../types';
import styled from 'styled-components/native'

const { width } = Dimensions.get('window');

const ButtonContainer = styled.View`
    flexDirection: column;
    justifyContent: space-between;
    margin-top: 40px;
    width: ${width * .9}px;
    height: 120px;
`

const ButtonGroup = ({ children }: IComp) : JSX.Element => {
    return (
        <ButtonContainer>
            {children}
        </ButtonContainer>
    );
}

export default ButtonGroup
