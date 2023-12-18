import * as React from 'react'
import { ITextProps } from '../types';
import { scaleFontSize } from '../styles/scaling';
import styled from 'styled-components/native';

const StyledText = styled.Text`
    font-weight: ${props => props.fontWeight};
    font-size: ${({ fontSize }) => scaleFontSize(fontSize)}px;
    width: fit-content;
    color: ${props => (props.color == 'primary')
        ? props.theme.palette.text.primary
        : props.theme.palette.text.secondary
    };
    lineHeight: ${({ fontSize }) => scaleFontSize(fontSize * 1.25)}px;
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
