import * as React from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ITextProps } from '../types';

const { width } = Dimensions.get('window');

const StyledText = styled.Text`
    font-weight: ${props => props.fontWeight};
    font-size: ${({ fontSize }) => fontSize}px;
    width: calc(90% * ${width})px;
    color: ${props => (props.color == 'primary')
        ? props.theme.palette.text.primary
        : props.theme.palette.text.secondary
    };
    lineHeight: 24px;
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
    color: 'primary',
    align: 'left'
}

export default Text
