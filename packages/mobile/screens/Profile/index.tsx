import * as React from 'react'
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import Row from '../../components/Row';
import { Settings } from 'lucide-react-native';
import { Routes } from '../routes';
import { Pressable } from 'react-native';

const NavButton = ({ navigation, to } : any ) : JSX.Element => (
    <Pressable onPress={() => navigation.navigate(to)}>
        <Settings size={24} color='#000' />
    </Pressable>
)

const Profile = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
    };

    return (
        <Container>
            <Row size={2} align='space-between'>
                <NavButton navigation={navigation} to={Routes.Settings} />
            </Row>
        </Container>
    );
}

export default Profile
