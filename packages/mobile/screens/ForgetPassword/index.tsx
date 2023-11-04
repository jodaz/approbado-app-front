import * as React from 'react'
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { EMAIL } from '@approbado/lib/utils/validations';
import {
    Container,
    Text,
    Row,
    TextInput,
    Button
} from '../../components';
import styled from 'styled-components/native';
import { Mail } from 'lucide-react-native';
import { Routes } from '../routes';

const FormContainer = styled.View`
    margin-top: 60px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const ForgetPassword = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
        navigation.navigate(Routes.CreateNewPassword)
    };

    return (
        <SafeAreaView>
            <Container>
                <FormContainer>
                    <Row size={1} align='center'>
                        <Text align='center'>
                            Recuperación de contraseña
                        </Text>
                    </Row>
                    <Row size={1} align='center'>
                        <Text align='center' fontSize={16} fontWeight={400} color='secondary'>
                            Verifica tu email, te hemos enviado un código de recuperación.
                        </Text>
                    </Row>
                    <Row size={4}>
                        <TextInput
                            name="email"
                            validations={EMAIL}
                            control={control}
                            placeholder='Ingresa tu correo'
                            icon={<Mail />}
                        />
                    </Row>
                    <Row size={4}>
                        <Button onPress={handleSubmit(onSubmit)} fullWidth>
                            Confirmar
                        </Button>
                    </Row>
                </FormContainer>
            </Container>
        </SafeAreaView>
    );
}

export default ForgetPassword
