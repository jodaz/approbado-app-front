import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components';
import { Subtheme } from '@approbado/lib/types/models'
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import styled from 'styled-components/native';
import { CheckCircle2 } from 'lucide-react-native';

const Container = styled.TouchableOpacity`
    width: 100%;
    flexDirection: row;
    align-items: center;
    justify-content: flex-start;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[0])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    background-color: ${props => props.isSelected ? '#ECECFB' : 'transparent'};
`

const SubthemeItem = ({ subtheme }: { subtheme: Subtheme }) => {
    const [isSelected, setIsSelected] = React.useState(false);

    const toggle = () => setIsSelected(!isSelected)

    return (
        <Container onPress={toggle} isSelected={isSelected}>
            <View style={{ flex: 1 }}>
                <Text align='left'>
                    {subtheme.name}
                </Text>
            </View>
            <View>
                <CheckCircle2 size={24} color={isSelected ? '#00B94A' : '#B7B7B7'} />
            </View>
        </Container>
    )
}

export default SubthemeItem;
