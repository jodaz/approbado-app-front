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
import InnerContainer from '../../components/InnerContainer';

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
            <InnerContainer>
                <Text>
                    Completa tu perfil
                </Text>
                <LightText
                    fontSize={16}
                    align='center'
                    fontWeight={400}
                >
                    Te hemos registrado ahora completa tu perfil para que verifiquemos tu identidad.
                </LightText>
                <FormContainer>
                    <TextInput
                        name="names"
                        validations={NAME}
                        control={control}
                        placeholder='Nombres'
                    />
                    <TextInput
                        name="last_name"
                        validations={LAST_NAME}
                        control={control}
                        placeholder='Apellidos'
                    />
                    <TextInput
                        name="phone"
                        control={control}
                        placeholder='Teléfono'
                    />
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Siguiente
                    </Button>
                </FormContainer>
            </InnerContainer>
        </Container>
    );
}

export default CompleteProfile
