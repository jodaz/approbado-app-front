import * as React from 'react'
import Text from './Text';
import styled from 'styled-components/native';
import { IComp } from '../types';
import { verticalScale } from '../styles/scaling';

const DrawerMenuButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: start;
    flex-direction: row;
    display: flex;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    border-radius: 6px;
    width: 100%;
    color: #000;
`

interface IDrawerButtonProps extends IComp {
    icon?: React.ReactNode;
    onPress: () => void;
}

const DrawerButton = ({ icon, children, onPress } : IDrawerButtonProps) => {
    return (
        <DrawerMenuButton onPress={onPress}>
            {icon ? React.cloneElement(icon, {
                size: 24,
                color: '#000',
                marginRight: 12
            }) : null}
            <Text>
                {children}
            </Text>
        </DrawerMenuButton>
    );
}

export default DrawerButton
