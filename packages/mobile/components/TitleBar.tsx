import * as React from 'react'
import styled from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
import { IComp } from '../types';
import { horizontalScale, verticalScale } from '../styles/scaling';

const NavContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
`;

const NavButton = styled.TouchableOpacity`
    margin-right: ${props => horizontalScale(props.theme.space[5])}px;
`

const TitleBar = ({ children }: IComp) : JSX.Element => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <NavContainer>
            <NavButton onPress={handleGoBack}>
                <ArrowLeft color='#000' size={24} />
            </NavButton>
            {children}
            <NavButton onPress={handleGoBack} />
        </NavContainer>
    );
}

export default TitleBar
