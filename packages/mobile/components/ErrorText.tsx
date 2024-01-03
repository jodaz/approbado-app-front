import * as React from 'react'
import { IComp } from '../types';
import styled from 'styled-components/native';

const ErrorText = styled.Text`
    color: ${props => props.theme.palette.error.main};
`;

const Error = ({ children } : IComp) : JSX.Element => (
    <ErrorText>
        {children}
    </ErrorText>
)

export default Error
