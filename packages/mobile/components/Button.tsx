import * as React from 'react'
import { IButtonProps } from '../screens/types/types';
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    padding-vertical: 16px;
    padding-horizontal: 48px;
    border-radius: 6px;
    color: #000;
    background-color: ${props => 
        (props.variant != 'contained') 
            ? 'transparent' : (props.bgColor == 'primary') 
                ? props.theme.palette.primary
                : props.theme.palette.secondary
    };
    border: ${props => (props.variant == 'outlined') ? '1px solid #A6A6A6' : 'none' };
`;

const ButtonText = styled.Text`
    font-weight: ${props => props.fontWeight };
`;

const Button = ({
    onPress,
    bgColor = 'primary',
    children,
    variant = 'contained',
    fontWeight = 600
} : IButtonProps) : JSX.Element => (
    <ButtonContainer
        onPress={onPress}
        bgColor={bgColor}
        variant={variant}
    >
        <ButtonText fontWeight={fontWeight}>{children}</ButtonText>
    </ButtonContainer>
)

export default Button
