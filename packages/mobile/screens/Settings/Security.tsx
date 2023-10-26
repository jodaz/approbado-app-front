import * as React from 'react'
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import TitleBar from '../../components/TitleBar';
import TextInput from '../../components/TextInput';
import Link from '../../components/Link';
import { CONFIRM_PASSWORD, PASSWORD } from '@approbado/lib/utils/validations';

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
                <InnerContainer>
                    <TitleBar title="Ajustes de seguridad" />
                    <FormContainer>
                        <TextInput
                            name="password"
                            validations={PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                        <TextInput
                            name="new_password"
                            validations={CONFIRM_PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                        <TextInput
                            name="new_password_confirmed"
                            validations={CONFIRM_PASSWORD}
                            control={control}
                            placeholder='Ingresa contraseña'
                            secureTextEntry
                        />
                    </FormContainer>
                    <Button onPress={handleSubmit(onSubmit)} fullWidth>
                        Guardar cambios
                    </Button>
                </InnerContainer>
            </Container>
        </SafeAreaView>
    );
}

export default Security
