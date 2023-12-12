import * as React from 'react'
import { Settings } from 'lucide-react-native';
import { Routes } from '../routes';
import { Pressable, Dimensions } from 'react-native';
import { useAuth } from '@approbado/lib/contexts/AuthContext';
import { Image } from '../../components';
import Button from '../../components/Button';
import Row from '../../components/Row';
import Text from '../../components/Text';
import styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tabs from '../../components/Tabs';
import profileSliders from './profileSliders';

const { width } = Dimensions.get('window');

const NavButton = ({ navigation, to } : any ) : JSX.Element => (
    <Pressable onPress={() => navigation.navigate(to)}>
        <Settings size={24} color='#000' />
    </Pressable>
)

const BioText = styled(Text)`
    padding-left: ${props => props.theme.space[3]};
    padding-right: ${props => props.theme.space[3]};
`

const Container = styled.View`
    margin: 0 auto;
    padding-top: ${(props) => props.theme.space[6]};
    width: ${width * .9}px;
    height: 100%;
`

const Profile = ({ navigation }) => {
    const { state: { user } } = useAuth();
    const Tab = createMaterialTopTabNavigator()

    return (
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
                <Button onPress={() => navigation.navigate(Routes.EditProfile)}>
                    Editar perfil
                </Button>
            </Row>
            <Tab.Navigator tabBar={Tabs}>
                {profileSliders.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </Container>
    );
}

export default Profile