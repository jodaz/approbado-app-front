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
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    padding-top: ${(props) => verticalScale(props.theme.space[2])};
    width: ${width - 40}px;
`

const Container2 = styled.View`
    flexDirection: column;
    width: 100%;
    alignItems: flex-start;
    justifyContent: flex-start;
    padding-left: ${(props) => horizontalScale(props.theme.space[3])};
`

const AboutInformationItem = ({ icon, title, children }) => (
    <Row size={2} align='start' justify='start' direction='row' style={{
        marginLeft: 20
    }}>
        {React.cloneElement(icon, {
            color: '#000',
            size: 24
        })}
        <Container2>
            <Text variant='secondary'>
                {title}
            </Text>
            {children}
        </Container2>
    </Row>
)

type IhandleOpenLink = (
    page: string,
    username: string
) => any;

const handleOpenLink: IhandleOpenLink = (page, username) => {
    Linking.openURL(`https://${page}.com/${username}`)
}

const ButtonIconLink = styled(Button)`
    width: 100px;
    height: 100px;
    margin: 0;
    padding: 0;
`

const About = () => {
    const { state: { user } } = useAuth();

    return (
        <Container>
            <Row size={1} align='center'>
                <Text
                    fontWeight={400}
                    fontSize={20}
                    align='left'
                    variant='primary'
                >
                    {user?.bio}
                </Text>
            </Row>
            <AboutInformationItem
                icon={<Mail />}
                title='Email'
            >
                <Text fontWeight={400}>
                    {user?.email}
                </Text>
            </AboutInformationItem>
            {user?.profile?.ocupation ? (
                <AboutInformationItem
                    icon={<GraduationCap />}
                    title='Ocupación'
                >
                    <Text fontWeight={400}>
                        {user.profile.ocupation}
                    </Text>
                </AboutInformationItem>
            ) : null}
            {(user?.profile?.twitter || user?.profile?.linkedin) ? (
                <AboutInformationItem
                    icon={<Link />}
                    title='Redes sociales'
                >
                    <Row direction="row">
                        {user?.profile?.linkedin ? (
                            <ButtonIconLink
                                variant='text'
                                onPress={() => handleOpenLink('linkedin', user?.profile.linkedin)}
                            >
                                <Linkedin />
                            </ButtonIconLink>
                        ) : null}
                        {user?.profile?.twitter ? (
                            <ButtonIconLink
                                variant='text'
                                onPress={() => handleOpenLink('twitter', user?.profile.twitter)}
                            >
                                <TwitterX height={72} width={72} />
                            </ButtonIconLink>
                        ) : null}
                    </Row>
                </AboutInformationItem>
            ) : null}
        </Container>
    );
}

export default About
