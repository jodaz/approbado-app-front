import * as React from 'react'
import { Modal, StyleSheet } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {
    Container,
    Text,
    Row,
    Button
} from '../../components';
import { verifyToken } from '@approbado/lib/services/reset-password.services'
import { Routes } from '../routes';
import styled from 'styled-components/native';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';

const FormContainer = styled.View`
    text-align: center;
    align-items: center;
    background-color: #fff;
`;

const CContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    alignItems: center;
    background-color: #fff;
`

const style = StyleSheet.create({
    inputContainer: {
        borderColor: '#B7B7B7',
        borderWidth: 1,
        color: '#000',
        borderStyle: 'solid',
        borderRadius: 6
    }
});

const ValidateCodeModal = ({ isOpen, toggleModal, navigation }) => {
    const [otpInput, setOtpInput] = React.useState<string>("");
    const { dispatch: dispatchToast } = useToast()

    const input = React.useRef<OTPTextView>(null);

    const onSubmit = async () => {
        const formData = {
            token: otpInput
        }
        const { status, success } = await verifyToken(formData)

        if (success) {
            await openToast(
                dispatchToast,
                'success',
                '¡Confirmado!'
            )
            navigation.navigate(Routes.CreateNewPassword, formData)
        } else {
            if (status == 422) {
                await openToast(
                    dispatchToast,
                    'error',
                    'Código inválido.'
                )
            }
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isOpen}
            onRequestClose={toggleModal}
        >
            <CContainer>
                <FormContainer>
                    <Row size={1} align='center'>
                        <Text align='center'>
                            Ingresa el código enviado a tu correo
                        </Text>
                    </Row>
                    <Row size={4}>
                        <OTPTextView
                            ref={input}
                            handleTextChange={setOtpInput}
                            // handleCellTextChange={handleCellTextChange}
                            inputCount={6}
                            keyboardType="default"
                            textInputStyle={style.inputContainer}
                        />
                    </Row>
                    <Row size={4}>
                        <Button
                            onPress={onSubmit}
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </Row>
                </FormContainer>
            </CContainer>
        </Modal>
    );
}

export default ValidateCodeModal
