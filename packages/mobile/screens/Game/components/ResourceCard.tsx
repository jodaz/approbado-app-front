import React from 'react';
import { Dimensions, View } from 'react-native';
import { File } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Text } from '../../../components';
import PDF from '@approbado/lib/icons/PDF2.svg'
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen')

const Pressable = styled.Pressable`
    display: flex;
    align-items: start;
    margin-horizontal: ${horizontalScale(width * .02)}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: ${width * .4}px;
    height: fit-content;
    position: relative;
`

const ResourceCard = ({ file }: { file: File }) : JSX.Element => {

    const downloadFile = () => {};

    return (
        <Pressable onPress={downloadFile} key={file?.id}>
            <View style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 6,
                backgroundColor: '#BDCDE0',
                borderRadius: scaleFontSize(12),
                flexDirection: 'row',
                paddingVertical: verticalScale(20),
                marginVertical: verticalScale(4),
                justifyContent: 'center'
            }}>
                <PDF />
            </View>
            <Text align='left'>
                {file.title}
            </Text>
        </Pressable>
    )
}

export default ResourceCard;
