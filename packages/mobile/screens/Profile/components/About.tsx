import * as React from 'react'
import { ScrollView, Linking, Dimensions } from 'react-native';
import { GraduationCap, Mail } from 'lucide-react-native';
import { Button, Text } from '../../../components';
import { Link } from 'lucide-react-native';
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import TwitterX from '@approbado/lib/icons/TwitterX.svg'
import Linkedin from '@approbado/lib/icons/Linkedin.svg'
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
    <Row size={2} align='start' justify='center' direction='row'>
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

const SocialLinks = ({ profile }) => {
    const handleOpenLink = (page, username) => {
        Linking.openURL(`https://${page}.com/${username}`)
    }
    return (
        <Row size={2} align='start' justify='center' direction='row'>
            <Link color='#000' size={24} />
            <Container2>
                <Text color='secondary'>
                    Redes sociales
                </Text>
                <Row size={2} direction='row' align='center'>
                    {profile?.linkedin ? (
                        <Button
                            variant='text'
                            onPress={() => handleOpenLink('linkedin', profile.linkedin)}
                        >
                            <Linkedin />
                        </Button>
                    ) : null}
                    {profile?.twitter ? (
                        <Button
                            variant='text'
                            onPress={() => handleOpenLink('twitter', profile.twitter)}
                        >
                            <TwitterX height={72} width={72} />
                        </Button>
                    ) : null}
                </Row>
            </Container2>
        </Row>
    )
}

const About = () => {
    const { state: { user } } = useAuth();

    return (
        <Container>
            <AboutInformationItem
                icon={<Mail />}
                title='Email'
                info={user.email}
            />
            {user?.profile?.ocupation ? (
                <AboutInformationItem
                    icon={<GraduationCap />}
                    title='Ocupación'
                    info={user.profile.ocupation}
                />
            ) : null}
            {(user?.profile?.twitter || user?.profile?.linkedin) ? (
                <SocialLinks profile={user.profile} />
            ) : null}
        </Container>
    );
}

export default About
