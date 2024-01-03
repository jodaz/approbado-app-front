import * as React from 'react'
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { EMAIL } from '@approbado/lib/utils/validations';
import { Mail } from 'lucide-react-native';
import {
    Container,
    Text,
    Row,
    TextInput,
    Button
} from '../../components';
import { resetPassword } from '@approbado/lib/services/reset-password.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import styled from 'styled-components/native';
import setFormErrors from '@approbado/lib/utils/setFormErrors';
import ValidateCodeModal from './ValidateCode';

const FormContainer = styled.View`
    margin-top: 60px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const ForgetPassword = ({ navigation }) => {
    const { control, handleSubmit, formState, setError } = useForm();
    const [isOpenVerifyCode, setIsOpenVerifyCode] = React.useState(false);
    const { dispatch: dispatchToast } = useToast()

    const toggleModal = () => setIsOpenVerifyCode(!isOpenVerifyCode)

    const onSubmit = async (values) => {
        const { status, success, data } = await resetPassword(values)

        if (success) {
            toggleModal()
            await openToast(
                dispatchToast,
                'success',
                '¡Código enviado!'
            )
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            }
        }
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
                        <Text align='center' fontSize={16} fontWeight={400} variant='secondary'>
                            Valida tu correo electrónico para recibir un código de recuperación.
                        </Text>
                    </Row>
                    <Row size={4}>
                        <TextInput
                            name="email"
                            validations={EMAIL}
                            control={control}
                            placeholder='Ingresa tu correo'
                            icon={<Mail />}
                            keyboardType='email-address'
                        />
                    </Row>
                    <Row size={4}>
                        <Button
                            disabled={!formState.isValid || formState.isSubmitting}
                            isLoading={formState.isSubmitting}
                            onPress={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </Row>
                </FormContainer>
                <ValidateCodeModal
                    isOpen={isOpenVerifyCode}
                    toggleModal={toggleModal}
                    navigation={navigation}
                />
            </Container>
        </SafeAreaView>
    );
}

export default ForgetPassword
