import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components';
import { Subtheme } from '@approbado/lib/types/models'
import { CheckCircle2 } from 'lucide-react-native';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { useGame, addTheme, removeTheme } from '@approbado/lib/contexts/GameContext';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    width: 100%;
    flexDirection: row;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.isSelected ? '#ECECFB' : '#FFF'};
    border-radius: ${scaleFontSize(6)}px;
    padding-vertical: ${verticalScale(12)}px;
    padding-horizontal: ${horizontalScale(12)}px;
    margin-vertical: ${props => verticalScale(props.theme.space[0])}px;
`

interface SubthemeItem {
    subtheme: Subtheme
}

const SubthemeItem = ({ subtheme }: SubthemeItem) => {
    const [isSelected, setIsSelected] = React.useState(false);
    const { dispatch } = useGame()

    const toggle = () => {
        if (isSelected) {
            removeTheme(dispatch, subtheme)
        } else {
            addTheme(dispatch, subtheme)
        }
        setIsSelected(!isSelected)
    }

    return (
        <Container disabled={subtheme.finished} onPress={toggle} isSelected={isSelected}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text align='left'>
                    {subtheme.id}.
                </Text>
                <Text align='left' style={{
                    marginLeft: 10
                }}>
                    {subtheme.name}
                </Text>
            </View>
            <View>
                <CheckCircle2 size={24} color={(isSelected || subtheme.finished) ? '#00B94A' : '#B7B7B7'} />
            </View>
        </Container>
    )
}

export default SubthemeItem;
