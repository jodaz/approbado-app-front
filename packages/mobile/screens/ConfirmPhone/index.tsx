import * as React from 'react'
import { StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import { Routes } from '../routes';
import { registerAndValidateCode } from '@approbado/lib/services/auth.services';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';
import OTPTextView from 'react-native-otp-textinput';
import setFormErrors from '@approbado/lib/utils/setFormErrors';

const LightText = styled(Text)`
    color: ${props => props.theme.palette.info.light};
`;

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
    flex-direction: column;
    justify-content: space-between;
    height: 50%;
`;

const style = StyleSheet.create({
    inputContainer: {
        borderColor: '#B7B7B7',
        borderWidth: 1,
        color: '#000',
        borderStyle: 'solid',
        borderRadius: 6
    }
});

const ConfirmPhone = ({ navigation }) => {
    const { control, handleSubmit, setError } = useForm();
    const { dispatch: dispatchToast } = useToast()
    const route = useRoute()
    const previousData = route.params;
    const [otpInput, setOtpInput] = React.useState<string>("");

    const input = React.useRef<OTPTextView>(null);

    const onSubmit = async () => {
        const formData = {
            ...previousData,
            code: otpInput
        }

        const { success, data, status } = await registerAndValidateCode(formData);

        if (success) {
            await openToast(
                dispatchToast,
                'success',
                'Su cuenta ha sido confirmada'
            )
            navigation.navigate(Routes.Login)
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            }
        }
    };

    return (
        <Container>
            <InnerContainer>
                <FormContainer>
                    <Text fontSize={20}>
                        Confirma tu identidad
                    </Text>
                    <LightText
                        fontSize={16}
                        align='center'
                        fontWeight={400}
                    >
                        Te hemos enviado un un código para confirmar tu identidad.
                    </LightText>
                    <OTPTextView
                        ref={input}
                        handleTextChange={setOtpInput}
                        // handleCellTextChange={handleCellTextChange}
                        inputCount={6}
                        keyboardType="numeric"
                        textInputStyle={style.inputContainer}
                    />
                    <LightText
                        fontSize={14}
                        align='center'
                        fontWeight={400}
                    >
                        Esto podria tardar algunos minutos dependiento de tu conectividad.
                    </LightText>
                    {/* <Button
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Siguiente
                    </Button> */}
                    <Button
                        onPress={onSubmit}
                        disabled={otpInput.length < 6}
                        fullWidth
                    >
                        Siguiente
                    </Button>
                </FormContainer>
            </InnerContainer>
        </Container>
    );
}

export default ConfirmPhone
