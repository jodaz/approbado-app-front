import React from 'react';
import { Dimensions, View } from 'react-native';
import { Award } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Image, Text } from '../../../components';
import styled from 'styled-components/native';
import SubthemeItem from './SubthemeItem';

const { width } = Dimensions.get('window')

const Pressable = styled.Pressable`
    display: flex;
    align-items: start;
    margin-horizontal: ${horizontalScale(width * .02)}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    position: relative;
`

const AwardListItem = ({ award }: { award: Award }) : JSX.Element => {
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen(!open);

    const renderSubthemesList = () => award.subthemes.map(subtheme => <SubthemeItem subtheme={subtheme} />)

    return (
        <View style={{
            flexDirection: 'column',
            flex: 1
        }}>
            <Pressable onPress={toggleOpen} key={award?.id}>
                <View style={{
                    borderRadius: scaleFontSize(12),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Image source={award.file} />
                        <Text align='center'>
                            {award.title}
                        </Text>
                    </View>
                    <Text fontWeight={300} align='center'>
                        {award.min_points}
                    </Text>
                </View>
            </Pressable>
            {open ? (
                <View style={{ flexDirection: 'column' }}>
                    {(award.subthemesCount < 1) ? (
                        <Text fontWeight={300} align='center'>
                            Sin temas
                        </Text>
                    ) : renderSubthemesList()}
                </View>
            ) : null}
        </View>
    )
}

export default AwardListItem;
