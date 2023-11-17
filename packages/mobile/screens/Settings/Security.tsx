import * as React from 'react'
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { CONFIRM_PASSWORD, PASSWORD } from '@approbado/lib/utils/validations';
import { updatePassword } from '@approbado/lib/services/settings.services';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TitleBar from '../../components/TitleBar';
import TextInput from '../../components/TextInput';
import Row from '../../components/Row';
import setFormErrors from '@approbado/lib/utils/setFormErrors';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Security = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch: dispatchToast } = useToast()

    const onSubmit = async (values) => {
        const { success, status, data } = await updatePassword(values)

        if (success) {
            await openToast(
                dispatchToast,
                'primary',
                'Contraseña actualizada'
            )
            navigation.goBack();
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            }
        }
    };

    return (
        <SafeAreaView>
            <Container>
                <TitleBar title="Ajustes de seguridad" />
                <FormContainer>
                    <Row size={1}>
                        <TextInput
                            name="curr_password"
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
                        <Button
                            disabled={!formState.isValid}
                            onPress={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Guardar cambios
                        </Button>
                    </Row>
                </FormContainer>
            </Container>
        </SafeAreaView>
    );
}

export default Security
