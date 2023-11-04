import * as React from 'react'
import { ScrollView } from 'react-native';
import { Settings } from 'lucide-react-native';
import { Routes } from '../routes';
import { Pressable } from 'react-native';
import { useAuth } from '@approbado/lib/contexts/AuthContext';
import { Image } from '../../components';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Text from '../../components/Text';
import styled from 'styled-components/native';
import ProfileInformationCard from './components/ProfileInformationCard';
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'
import Forum from '@approbado/lib/illustrations/Forum.svg'
import Forum2 from '@approbado/lib/illustrations/Forum2.svg'
import Ribbon from '@approbado/lib/illustrations/Ribbon.svg'

const NavButton = ({ navigation, to } : any ) : JSX.Element => (
    <Pressable onPress={() => navigation.navigate(to)}>
        <Settings size={24} color='#000' />
    </Pressable>
)

const BioText = styled(Text)`
    padding-left: ${props => props.theme.space[3]};
    padding-right: ${props => props.theme.space[3]};
`

const Profile = ({ navigation }) => {
    const { state: { user } } = useAuth();

    return (
        <ScrollView>
            <Container>
                <Row size={2} align='space-between'>
                    <NavButton navigation={navigation} to={Routes.Settings} />
                </Row>
                <Row size={1} align='center'>
                    <Image
                        height={100}
                        width={100}
                        source={user?.picture}
                        borderRadius={50}
                    />
                </Row>
                <Row size={1} align='center'>
                    <Text fontSize={16}>{user?.names}</Text>
                </Row>
                <Row size={1} align='center'>
                    <Text fontSize={16} color='secondary'>@{user?.user_name}</Text>
                </Row>
                <Row size={1} align='center'>
                    <BioText
                        fontWeight={400}
                        fontSize={16}
                        align='center'
                        color='primary'
                    >
                        {user?.bio}
                    </BioText>
                </Row>
                <Row size={2} align='center'>
                    <Button>
                        Editar perfil
                    </Button>
                </Row>
                <Row size={1} align='center'>
                    <ProfileInformationCard
                        image={<Stage1 />}
                        amount={user?.profile.points}
                        text='Puntos'
                    />
                    <ProfileInformationCard
                        image={<Forum />}
                        amount={user?.comments.length}
                        text='Debates respondidos'
                    />
                    <ProfileInformationCard
                        image={<Forum2 />}
                        amount={user?.posts.length}
                        text='Debates publicados'
                    />
                    <ProfileInformationCard
                        image={<Ribbon />}
                        amount={user?.awards.length}
                        text='Certificaciones'
                    />
                </Row>
            </Container>
        </ScrollView>
    );
}

export default Profile
