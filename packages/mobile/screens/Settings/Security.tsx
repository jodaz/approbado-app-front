import * as React from 'react'
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { CONFIRM_PASSWORD, PASSWORD } from '@approbado/lib/utils/validations';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TitleBar from '../../components/TitleBar';
import TextInput from '../../components/TextInput';
import Row from '../../components/Row';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Security = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <Container>
                <TitleBar title="Ajustes de seguridad" />
                <FormContainer>
                    <Row size={1}>
                        <TextInput
                            name="password"
                            validations={PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                    </Row>
                    <Row size={1}>
                        <TextInput
                            name="new_password"
                            validations={CONFIRM_PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                    </Row>
                    <Row size={1}>
                        <TextInput
                            name="new_password_confirmed"
                            validations={CONFIRM_PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                    </Row>
                    <Row size={6}>
                        <Button onPress={handleSubmit(onSubmit)} fullWidth>
                            Guardar cambios
                        </Button>
                    </Row>
                </FormContainer>
            </Container>
        </SafeAreaView>
    );
}

export default Security
