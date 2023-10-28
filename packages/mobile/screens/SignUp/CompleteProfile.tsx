import * as React from 'react'
import { useForm } from 'react-hook-form';
import { LAST_NAME, NAME, PHONE } from '@approbado/lib/utils/validations'
import { Routes } from '../routes';
import { useRoute } from '@react-navigation/native';
import { getCode } from '@approbado/lib/services/auth.services'
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import Container from '../../components/Container';
import Row from '../../components/Row';

const LightText = styled(Text)`
    color: ${props => props.theme.palette.info.light};
`

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const CompleteProfile = ({ navigation }) => {
    const { control, handleSubmit } = useForm();
    const route = useRoute()
    const previousData = route.params;

    const onSubmit = async values => {
        const data = {
            ...previousData,
            ...values
        }

        try {
            const response = await getCode(data);

            if (response.success) {
                navigation.navigate(Routes.ConfirmPhone, data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container>
            <Row size={4} align='center'>
                <Text>
                    Completa tu perfil
                </Text>
            </Row>
            <Row size={2} align='center'>
                <LightText
                    fontSize={16}
                    align='center'
                    fontWeight={400}
                >
                    Te hemos registrado ahora completa tu perfil para que verifiquemos tu identidad.
                </LightText>
            </Row>
            <FormContainer>
                <Row size={1}>
                    <TextInput
                        name="names"
                        validations={NAME}
                        control={control}
                        placeholder='Nombres'
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="last_name"
                        validations={LAST_NAME}
                        control={control}
                        placeholder='Apellidos'
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="phone"
                        control={control}
                        placeholder='Teléfono'
                    />
                </Row>
            </FormContainer>

            <Row size={1}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                >
                    Siguiente
                </Button>
            </Row>
        </Container>
    );
}

export default CompleteProfile
