import * as React from 'react'
import { Text } from '../../../components';
import styled from 'styled-components/native';

const RootView = styled.View`
    width: 100%;
    display: flex;
    padding: 18px 16px;
    flex-direction: row;
    align-items: center;
`;

const ContentContainer = styled.View`
    text-align: left;
    margin-left: 24px;
`;

const ImageContainer = styled.View`
    height: 32px;
    width: 32px;
    background-color: ${({ theme }) => theme.palette.primary.light};
    padding: 0.5px;
`;

interface IProfileInformationCard {
    amount: number;
    text: string;
    image?: React.ReactNode;
}

const ProfileInformationCard = ({ image, amount, text } : IProfileInformationCard) : JSX.Element => (
    <RootView>
        {image && (
            <ImageContainer>
                {React.cloneElement(image, {
                    height: 50,
                    width: 50
                })}
            </ImageContainer>
        )}
        <ContentContainer>
            <Text fontSize={16} fontWeight={600}>
                {amount ? amount : 0}
            </Text>
            <Text fontSize={16} fontWeight={600} variant='secondary'>
                {text}
            </Text>
        </ContentContainer>
    </RootView>
);

ProfileInformationCard.propTypes = {
    amount: 0,
    text: 'hola'
}

export default ProfileInformationCard;
