import * as React from 'react'
import { ScrollView, Dimensions } from 'react-native';
import Text from '../../../components/Text';
import Row from '../../../components/Row';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: ${(props) => props.theme.space[2]};
    width: ${width - 40}px;
`

const About = ({ user }) => {

    return (
        <ScrollView>
            <Container>
                <Row size={1} align='center'>
                    <Text fontWeight={400}>
                        No tiene publicaciones disponibles
                    </Text>
                </Row>
            </Container>
        </ScrollView>
    );
}

export default About
