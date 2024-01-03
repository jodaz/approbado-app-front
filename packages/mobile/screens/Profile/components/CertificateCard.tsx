import * as React from 'react'
import { Text } from '../../../components';
import styled from 'styled-components/native';

const RootView = styled.View`
    width: 200px;
    heigth: 200px;
    display: flex;
    padding: 18px 16px;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
`;

const ContentContainer = styled.View`
    text-align: center;
    margin-top: 10px;
    align-items: center;
`;

const ImageContainer = styled.View`
    height: 32px;
    width: 32px;
    background-color: ${({ theme }) => theme.palette.primary.light};
    padding: 0.5px;
`;

interface ICertificateCard {
    name: string;
    title: string;
    image?: React.ReactNode;
}

const CertificateCard = ({ image, name, title } : ICertificateCard) : JSX.Element => (
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
            <Text
                fontSize={16}
                fontWeight={600}
                variant='primary'
                align='center'
            >
                {name}
            </Text>
            <Text fontSize={16} fontWeight={600} variant='primary'>
                {title}
            </Text>
        </ContentContainer>
    </RootView>
);

CertificateCard.propTypes = {
    amount: 0,
    name: 'hola'
}

export default CertificateCard;
