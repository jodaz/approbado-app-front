import * as React from 'react'
import { useForm } from 'react-hook-form';
import { PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { Routes } from '../routes';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';

const Container = styled.View`
    flex: 1;
    justify-content: start;
    padding: 20px;
    margin-top: 100px;
    text-align: center;
`;

const CompleteProfile = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        navigation.navigate(Routes.ConfirmPhone)
    };

    return (
        <Container>
            <Text>
                Completa tu perfil
            </Text>
            <TextInput
                name="names"
                validations={USERNAME}
                control={control}
                placeholder='Nombres'
            />
            <TextInput
                name="last_name"
                validations={PASSWORD}
                control={control}
                placeholder='Apellidos'
            />
            {/* Create phone input */}
            <TextInput
                name="last_name"
                validations={PASSWORD}
                control={control}
                placeholder='Apellidos'
            />
            <Button onPress={handleSubmit(onSubmit)}>
                Siguiente
            </Button>
        </Container>
    );
}

export default CompleteProfile
