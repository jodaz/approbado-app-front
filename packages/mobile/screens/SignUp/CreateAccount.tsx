import * as React from 'react'
import { Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { EMAIL, PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import {
    Text,
    Button,
    TextInput,
    Row,
    Checkbox,
    Link,
    Container
} from '../../components';
import { LockIcon, User2, Mail } from 'lucide-react-native';
import GoogleLoginButton from '../../components/GoogleLogin';
import FacebookLoginButton from '../../components/FacebookLogin';
import { createAccountStep1 } from '@approbado/lib/services/auth.services';
import setFormErrors from '@approbado/lib/utils/setFormErrors';
import TermsCheckbox from './components/TermsCheckbox';


const CreateAccount = ({ navigation }) => {
    const { control, handleSubmit, setError, formState, watch } = useForm();
    const terms = watch('terms')

    const onSubmit = async (values) => {
        console.log(JSON.stringify(values, null, ' '))
        // const { success, status, data } = await createAccountStep1(values);

        // if (success) {
        //     navigation.navigate(Routes.CompleteProfile, values)
        // } else {
        //     if (status == 422) {
        //         setFormErrors(setError, data)
        //     }
        // }
    };

    console.log(terms)

    return (
        <Container>
            <Row size={4} align='center'>
                <Image source={require('../../assets/Logo.png')} />
            </Row>
            <Row size={1} align='center'>
                <Text align='center'>
                    Crear una cuenta
                </Text>
            </Row>
            <Row size={1}>
                <TextInput
                    name="user_name"
                    validations={USERNAME}
                    control={control}
                    placeholder='Usuario'
                    icon={<User2 />}
                />
            </Row>
            <Row size={1}>
                <TextInput
                    name="email"
                    validations={EMAIL}
                    control={control}
                    placeholder='Correo electrónico'
                    icon={<Mail />}
                    keyboardType={'email-address'}
                />
            </Row>
            <Row size={1}>
                <TextInput
                    name="password"
                    validations={PASSWORD}
                    control={control}
                    placeholder='Contraseña'
                    secureTextEntry
                    icon={<LockIcon />}
                />
            </Row>
            <Row size={1}>
                <TermsCheckbox
                    name='terms'
                    validations={{ required: true }}
                    control={control}
                />
            </Row>
            <Row size={2}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid || formState.isSubmitting || !terms}
                    isLoading={formState.isSubmitting}
                >
                    Crear una cuenta
                </Button>
            </Row>
            <Row size={2} align='center'>
                <Text fontSize={14} fontWeight={400}>
                    Iniciar sesión con un tercero
                </Text>
            </Row>
            <Row size={1} align='center'>
                <GoogleLoginButton />
            </Row>
            <Row size={1} align='center'>
                <FacebookLoginButton />
            </Row>
            <Text fontSize={16} align='center'>
                ¿Ya tienes una cuenta?
            </Text>
            <Link to={Routes.Login} align='center'>
                Ingresa aquí
            </Link>
        </Container>
    );
}

export default CreateAccount
