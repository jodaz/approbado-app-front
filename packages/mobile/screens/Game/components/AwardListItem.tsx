import React from 'react';
import { Dimensions, View } from 'react-native';
import { Award, Subtheme } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Image, Text } from '../../../components';
import styled from 'styled-components/native';
import SubthemeItem from './SubthemeItem';

const Pressable = styled.Pressable`
    display: flex;
    align-items: start;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    position: relative;
    border-radius: ${scaleFontSize(6)}px;
    padding-vertical: ${verticalScale(12)}px;
    padding-horizontal: ${horizontalScale(12)}px;
    background-color: #fff;
`

interface AwardListItem {
    award: Award
}

const AwardListItem = ({ award }: AwardListItem) : JSX.Element => {
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen(!open);

    const renderSubthemesList = () => award.subthemes.map((subtheme: Subtheme) => (
        <SubthemeItem
            subtheme={subtheme}
        />
    ))

    return (
        <View style={{
            flexDirection: 'column',
            flex: 1
        }}>
            <Pressable onPress={toggleOpen} key={award?.id}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Image
                            source={award.file}
                            height={20}
                            width={20}
                        />
                        <Text align='center' style={{
                            marginLeft: horizontalScale(10)
                        }}>
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
