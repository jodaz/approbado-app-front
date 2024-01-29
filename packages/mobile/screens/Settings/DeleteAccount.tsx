import * as React from 'react'
import { deleteAccount } from '@approbado/lib/services/settings.services';
import { useForm } from 'react-hook-form';
import { logout, useAuth } from '@approbado/lib/contexts/AuthContext';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Routes } from '../routes';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Row from '../../components/Row';

const DeleteAccount = ({ navigation }) => {
    const { handleSubmit, formState } = useForm();
    const { dispatch } = useAuth()
    const { dispatch: dispatchToast } = useToast()

    const onSubmit = async () => {
        const { success } = await deleteAccount();

        if (success) {
            await openToast(
                dispatchToast,
                'success',
                'Su cuenta ha sido eliminada'
            )
            logout(dispatch)
            navigation.navigate(Routes.Onboarding)
        }
    };

    return (
        <Container>
            <Row>
                <Text fontSize={18} fontWeight={400}>
                    Al realizar el proceso de eliminar tu cuenta de approbado.com,
                    tu nombre visible dentro de la plataforma, tu @usuario y toda
                    la información relacionada dentro de la plataforma ya no se podrán ver en approbado.com
                </Text>
            </Row>
            <Row size={4}>
                <Button
                    variant='outlined'
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                >
                    Eliminar cuenta
                </Button>
            </Row>
        </Container>
    );
}

export default DeleteAccount
