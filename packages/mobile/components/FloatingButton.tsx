import * as React from 'react'
import { ActivityIndicator } from 'react-native';
import { IButtonProps } from '../types'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    padding-vertical: 18px;
    padding-horizontal: 18px;
    border-radius: 48px;
    zIndex: 100;
    position: absolute;
    bottom: 50px;
    right: 0;
    color: #000;
    background-color: ${props =>
        props.disabled
            ? props.theme.palette.secondary.light
            : (props.variant != 'contained')
            ? 'transparent' : (props.bgColor == 'primary')
            ? props.theme.palette.primary.main
            : props.theme.palette.secondary.main
    };
    border: ${props => (props.variant == 'outlined') ? '1px solid #A6A6A6' : 'none' };
    width: ${props => props.fullWidth ? '100%' : 'unset'}
`;

const FloatingButton = ({
    children,
    fontWeight,
    isLoading,
    icon,
    disabled,
    ...rest
} : IButtonProps) : JSX.Element => (
    <ButtonContainer disabled={disabled} {...rest}>
        {!isLoading ? (
            React.cloneElement(icon, {
                color: '#000',
                size: 32
            })
        ) : <ActivityIndicator color='#fff' />}
    </ButtonContainer>
)

FloatingButton.defaultProps = {
    bgColor: 'primary',
    variant: 'contained',
    fontWeight: 600,
    color: 'secondary'
}

export default FloatingButton
