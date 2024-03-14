import * as React from 'react'
import { Edit2, Settings } from 'lucide-react-native';
import { Routes } from '../routes';
import { Pressable, Dimensions, View } from 'react-native';
import { useAuth } from '@approbado/lib/contexts/AuthContext';
import { Text, Row, Image } from '../../components';
import { verticalScale } from '../../styles/scaling';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tabs from '../../components/Tabs';
import About from "./components/About";
import Achievements from "./components/Achievements";
import Publications from "./components/Publications";
import styled, { useTheme } from 'styled-components/native';

const profileSliders = [
    {
        name: 'Achievements',
        component: Achievements,
        options: {
            tabBarLabel: 'Logros'
        }
    },
    {
        name: 'About',
        component: About,
        options: {
            tabBarLabel: 'Sobre mí'
        }
    },
    {
        name: 'Publications',
        component: Publications,
        options: {
            tabBarLabel: 'Publicaciones'
        }
    }
];

const { width } = Dimensions.get('window');

const NavButton = ({ navigation, to, children } : any ) : JSX.Element => (
    <Pressable onPress={() => navigation.navigate(to)}>
        {React.cloneElement(children, {
            size: 24,
            color: '#000',
            marginRight: 8,
            marginLeft: 8
        })}
    </Pressable>
)

const Container = styled.View`
    margin: 0 auto;
    padding-top: ${(props) => verticalScale(props.theme.space[4])}px;
    width: ${width * .95}px;
    height: 100%;
    flex: 1;
`

const Profile = ({ navigation }) => {
    const { state: { user } } = useAuth();
    const Tab = createMaterialTopTabNavigator()
    const theme = useTheme();

    return (
        <Container>
            <Row size={2} justify='space-between' align='start' direction='row'>
                <View style={{
                    flexDirection: 'row',
                    flex: 1
                }}>
                    <Image
                        height={50}
                        width={50}
                        source={user?.picture}
                        borderRadius={50}
                    />
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Text fontSize={20}>{user?.names}</Text>
                        <Text
                            fontSize={18}
                            variant='secondary'
                        >
                            @{user?.user_name}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <NavButton navigation={navigation} to={Routes.EditProfile}>
                        <Edit2 />
                    </NavButton>
                    <NavButton navigation={navigation} to={Routes.Settings}>
                        <Settings />
                    </NavButton>
                </View>
            </Row>
            <Tab.Navigator tabBar={Tabs}>
                {profileSliders.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </Container>
    );
}

export default Profile
