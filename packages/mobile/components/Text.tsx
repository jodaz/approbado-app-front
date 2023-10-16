import * as React from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ITextProps } from '../screens/types/types';

const { width } = Dimensions.get('window');

const StyledText = styled.Text`
    font-weight: 600;
    font-size: ${({ fontSize }) => fontSize}px;
    width: calc(90% * ${width});
    color: #000;
`;

const Text = ({ children, ...restProps }: ITextProps) : JSX.Element => (
    <StyledText {...restProps}>
        {children}
    </StyledText>
);

Text.defaultProps = {
    fontSize: 20,
    color: 'secondary'
}

export default Text
