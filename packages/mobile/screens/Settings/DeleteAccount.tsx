import * as React from 'react'
import { deleteAccount } from '@approbado/lib/services/settings.services';
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { logout, useAuth } from '@approbado/lib/contexts/AuthContext';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Text from '../../components/Text';
import TitleBar from '../../components/TitleBar';
import Row from '../../components/Row';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';

const DeleteAccount = () => {
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
        }
    };

    return (
        <SafeAreaView>
            <Container>
                <TitleBar title="Ajustes de cuenta" />
                <Row size={4}>
                    <Text fontSize={16} fontWeight={400}>
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
        </SafeAreaView>
    );
}

export default DeleteAccount
