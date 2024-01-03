import React from 'react';
import Text from './Text';
import Row from './Row';
import styled from 'styled-components/native';
import { IComp } from '../types';
import { ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface INavButtonProps extends IComp {
    to: string;
    spacing?: number;
}

const StyledNavButton = styled.TouchableOpacity`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

const NavButton = ({ children, to, spacing } : INavButtonProps ) : JSX.Element => {
    const navigation = useNavigation();

    return (
        <Row size={spacing}>
            <StyledNavButton onPress={() => navigation.navigate(to)}>
                <Text fontSize={18} fontWeight={400}>
                    {children}
                </Text>
                <ChevronRight size={24} color='#000' />
            </StyledNavButton>
        </Row>
    )
}

NavButton.defaultProps = {
    spacing: 2
}

export default NavButton;
