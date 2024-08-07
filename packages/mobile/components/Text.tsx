import * as React from 'react'
import { ITextProps } from '../types';
import { scaleFontSize } from '../styles/scaling';
import styled from 'styled-components/native';

const StyledText = styled.Text`
    font-size: ${({ fontSize }) => scaleFontSize(fontSize)}px;
    width: fit-content;
    color: ${props => props.theme.palette[props.color][props.variant]};
    lineHeight: ${({ fontSize }) => scaleFontSize(fontSize * 1.25)}px;
    text-align: ${props => props.align};
    letter-spacing: ${scaleFontSize(0.5)}px;
    text-decoration: ${props => props.decoration};
    font-family: ${props => props.theme.typography.fontWeight[props.fontWeight]};
    display: flex;
    align-items: center;
    flex-direction: row;
`;


const defaultProps = {
    fontSize: 20,
    fontWeight: 600,
    color: 'text',
    decoration: 'none',
    variant: 'primary',
    align: 'left'
}

const Text = ({
    children,
    fontSize = 20,
    fontWeight = 600,
    color = 'text',
    decoration = 'none',
    variant = 'primary',
    align = 'left'
 }: ITextProps) : JSX.Element => {
    return (
        <StyledText
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            decoration={decoration}
            variant={variant}
            align={align}
        >
            {children}
        </StyledText>
    );
}

export default Text
