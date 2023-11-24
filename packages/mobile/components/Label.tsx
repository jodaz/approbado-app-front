import * as React from 'react'
import { IComp } from '../types';
import styled from 'styled-components/native';

const LabelText = styled.Text`
    color: ${props => props.theme.palette.info.light};
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    letter-spacing: 1px;
`;

const Label = ({ children } : IComp) : JSX.Element => (
    <LabelText>
        {children}
    </LabelText>
)

export default Label
