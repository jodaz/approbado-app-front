import * as React from 'react'
import { Image, Text } from '../../../components';
import styled from 'styled-components/native';
import { Award } from '@approbado/lib/types/models';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const RootView = styled.View`
    width: ${horizontalScale(140)}px;
    heigth: ${verticalScale(140)}px;
    display: flex;
    padding-vertical: ${verticalScale(18)}px;
    margin-vertical: ${verticalScale(18)}px;
    padding-horizontal: ${horizontalScale(16)}px;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-color: #F8F8FC;
    margin-right: ${horizontalScale(20)}px;
`;

const ContentContainer = styled.View`
    text-align: center;
    margin-top: ${verticalScale(10)}px;
    align-items: center;
`;

const ImageContainer = styled.View`
    background-color: ${({ theme }) => theme.palette.primary.light};
    padding-vertical: ${verticalScale(10)}px;
    padding-horizontal: ${horizontalScale(10)}px;
`;

const CertificateCard = ({ item } : { item: Award }) : JSX.Element => (
    <RootView>
        <ImageContainer>
            <Image source={item.file} />
        </ImageContainer>
        <ContentContainer>
            <Text
                fontSize={18}
                fontWeight={600}
                variant='primary'
                align='center'
            >
                {item.title}
            </Text>
        </ContentContainer>
    </RootView>
);

CertificateCard.propTypes = {
    amount: 0,
    name: 'hola'
}

export default CertificateCard;
