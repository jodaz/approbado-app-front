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
import CheckSolid from '@approbado/lib/icons/CheckSolid.svg'
import styled from 'styled-components/native';

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
    const { control, handleSubmit, watch } = useForm();
    const [isVerified, setIsVerified] = React.useState<boolean>(false)
    const password = watch("password", "");

    const onSubmit = async (values) => {
        setIsVerified(true)
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
                                name="confirm_password"
                                validations={CONFIRM_PASSWORD}
                                control={control}
                                placeholder='Confirma tu contraseña'
                                icon={<LockIcon />}
                                secureTextEntry
                            />
                        </Row>
                    </Row>
                    <Row size={4}>
                        <Button onPress={handleSubmit(onSubmit)} fullWidth>
                            Guardar cambios
                        </Button>
                    </Row>
                </FormContainer>
            </Container>
        </SafeAreaView>
    );
}

export default CreateNewPassword
