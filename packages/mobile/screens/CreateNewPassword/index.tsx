import * as React from 'react'
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import {
    CONFIRM_PASSWORD,
    PASSWORD
} from '@approbado/lib/utils/validations';
import {
    Container,
    Text,
    Row,
    TextInput,
    Button
} from '../../components';
import { LockIcon } from 'lucide-react-native';
import { Routes } from '../routes';
import { setNewPassword } from '@approbado/lib/services/reset-password.services';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { useRoute } from '@react-navigation/native';
import CheckSolid from '@approbado/lib/icons/CheckSolid.svg'
import styled from 'styled-components/native';
import setFormErrors from '@approbado/lib/utils/setFormErrors';

const FormContainer = styled.View`
    margin-top: 60px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Continue = ({ navigation }) => (
    <SafeAreaView>
        <Container>
            <FormContainer>
                <Row size={4} align='center'>
                    <CheckSolid />
                </Row>
                <Row size={1} align='center'>
                    <Text align='center'>
                        Hemos recuperado tu contraseña de forma exitosa.
                    </Text>
                </Row>
                <Row size={4}>
                    <Button onPress={() => navigation.navigate(Routes.Login)} fullWidth>
                        Continuar
                    </Button>
                </Row>
            </FormContainer>
        </Container>
    </SafeAreaView>
)

const CreateNewPassword = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const [isVerified, setIsVerified] = React.useState<boolean>(false)
    const { dispatch: dispatchToast } = useToast()
    const route = useRoute()
    const previousData = route.params;

    const onSubmit = async (values) => {
        const formData = {
            ...previousData,
            ...values
        }
        console.log(formData)
        const { status, success, data } = await setNewPassword(formData)

        if (success) {
            setIsVerified(true)
        } else {
            if (status == 422) {
                console.log(data)
                setFormErrors(setError, data)
            } else {
                await openToast(
                    dispatchToast,
                    'error',
                    'Ha ocurrido un error'
                )
            }
        }
    };

    if (isVerified) return <Continue navigation={navigation} />

    return (
        <SafeAreaView>
            <Container>
                <FormContainer>
                    <Row size={1} align='center'>
                        <Text align='center'>
                            Crea una nueva contraseña
                        </Text>
                    </Row>
                    <Row size={1} align='center'>
                        <Text align='center' fontSize={16} fontWeight={400} color='secondary'>
                            Es el momento de crear una nueva contraseña para tu cuenta.
                        </Text>
                    </Row>
                    <Row size={4}>
                        <Row size={1}>
                            <TextInput
                                name="password"
                                validations={PASSWORD}
                                control={control}
                                placeholder='Ingresa tu contraseña'
                                icon={<LockIcon />}
                                secureTextEntry
                            />
                        </Row>
                        <Row size={1}>
                            <TextInput
                                name="password_confirmed"
                                validations={CONFIRM_PASSWORD}
                                control={control}
                                placeholder='Confirma tu contraseña'
                                icon={<LockIcon />}
                                secureTextEntry
                            />
                        </Row>
                    </Row>
                    <Row size={4}>
                        <Button
                            onPress={handleSubmit(onSubmit)}
                            fullWidth
                            disabled={!formState.isValid || formState.isSubmitting}
                            isLoading={formState.isSubmitting}
                        >
                            Guardar cambios
                        </Button>
                    </Row>
                </FormContainer>
            </Container>
        </SafeAreaView>
    );
}

export default CreateNewPassword
