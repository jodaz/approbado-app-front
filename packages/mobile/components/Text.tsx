import * as React from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ITextProps } from '../types';

const { width } = Dimensions.get('window');

const StyledText = styled.Text`
    font-weight: ${props => props.fontWeight};
    font-size: ${({ fontSize }) => fontSize}px;
    width: calc(90% * ${width})px;
    color: #000;
    text-align: ${props => props.align};
`;

const Text = ({ children, ...restProps }: ITextProps) : JSX.Element => (
    <StyledText {...restProps}>
        {children}
    </StyledText>
);

Text.defaultProps = {
    fontSize: 20,
    fontWeight: 600,
    color: 'secondary',
    align: 'left'
}

export default Text
