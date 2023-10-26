import * as React from 'react'
import styled from 'styled-components/native';
import Text from './Text';
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
import { ITitleBarProps } from '../types';

const NavContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 10px;
`;

const NavButton = styled.TouchableOpacity`
    margin-right: ${props => props.theme.space[5]};
`

const TitleBar = ({ title }: ITitleBarProps) : JSX.Element => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <NavContainer>
            <NavButton onPress={handleGoBack}>
                <ArrowLeft color='#000' size={24} />
            </NavButton>
            <Text fontSize={18} fontWeight={600}>
                {title}
            </Text>
        </NavContainer>
    );
}

export default TitleBar
