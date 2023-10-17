import * as React from 'react'
import { IButtonProps } from '../types'
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
                ? props.theme.palette.primary.main
                : props.theme.palette.secondary.main
    };
    border: ${props => (props.variant == 'outlined') ? '1px solid #A6A6A6' : 'none' };
    width: ${props => props.fullWidth ? '100%' : 'unset'}
`;

const ButtonText = styled.Text`
    font-weight: ${props => props.fontWeight };
`;

const Button = ({
    children,
    fontWeight,
    ...rest
} : IButtonProps) : JSX.Element => (
    <ButtonContainer {...rest}>
        <ButtonText fontWeight={fontWeight}>{children}</ButtonText>
    </ButtonContainer>
)

Button.defaultProps = {
    bgColor: 'primary',
    variant: 'contained',
    fontWeight: 600
}

export default Button
