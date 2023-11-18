import * as React from 'react'
import { ScrollView, Dimensions } from 'react-native';
import { GraduationCap, Mail } from 'lucide-react-native';
import { Text } from '../../../components';
import Row from '../../../components/Row';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.View`
    flex-direction: column;
    align-items: cener;
    justify-content: center;
    padding-top: ${(props) => props.theme.space[2]};
    width: ${width - 60}px;
    padding-left: ${(props) => props.theme.space[4]};
`

const Container2 = styled.View`
    flexDirection: column;
    width: 100%;
    alignItems: flex-start;
    justifyContent: flex-start;
    padding-left: ${(props) => props.theme.space[3]};
`

const AboutInformationItem = ({ icon, title, info }) => (
    <Row size={1} align='start' justify='center' direction='row'>
        {React.cloneElement(icon, {
            color: '#000',
            size: 24
        })}
        <Container2>
            <Text color='secondary'>
                {title}
            </Text>
            <Text fontWeight={400}>
                {info}
            </Text>
        </Container2>
    </Row>
)

const About = ({ user }) => (
    <ScrollView>
        <Container>
            <AboutInformationItem
                icon={<Mail />}
                title='Email'
                info={user.email}
            />
            {user?.ocupation && (
                <AboutInformationItem
                    icon={<GraduationCap />}
                    title='Ocupación'
                    info={user.ocupation}
                />
            )}
        </Container>
    </ScrollView>
);

export default About
