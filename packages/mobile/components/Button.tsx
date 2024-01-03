import * as React from 'react'
import { ActivityIndicator } from 'react-native';
import { IButtonProps } from '../types'
import {
    horizontalScale,
    scaleFontSize,
    verticalScale
} from '../styles/scaling';
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    padding-vertical: ${verticalScale(12)}px;
    padding-horizontal: ${horizontalScale(24)}px;
    border-radius: ${scaleFontSize(6)}px;
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

const ButtonText = styled.Text`
    font-weight: ${props => props.fontWeight};
    font-size: ${scaleFontSize(18)}px;
    align-items: center;
    flex-direction: row;
    display: flex;
`;

const Button = ({
    children,
    fontWeight,
    isLoading,
    disabled,
    ...rest
} : IButtonProps) : JSX.Element => (
    <ButtonContainer disabled={disabled} {...rest}>
        {!isLoading ? (
            <ButtonText fontWeight={fontWeight}>{children}</ButtonText>
        ) : <ActivityIndicator color={'#000'} size={scaleFontSize(24)} />}
    </ButtonContainer>
)

Button.defaultProps = {
    bgColor: 'primary',
    variant: 'contained',
    fontWeight: 600,
    color: 'secondary'
}

export default Button
