import * as React from 'react'
import { useForm } from 'react-hook-form';
import { CONFIRM_PASSWORD, PASSWORD } from '@approbado/lib/utils/validations';
import { updatePassword } from '@approbado/lib/services/settings.services';
import {
    Row,
    Button,
    Container
} from '../../components';
import TextInput from '../../components/TextInput';
import setFormErrors from '@approbado/lib/utils/setFormErrors';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';

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
        <Container>
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
                    disabled={!formState.isValid || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                >
                    Guardar cambios
                </Button>
            </Row>
        </Container>
    );
}

export default Security
