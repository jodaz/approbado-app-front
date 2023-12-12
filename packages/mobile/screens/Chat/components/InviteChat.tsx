import * as React from 'react'
import { listUsers } from '@approbado/lib/services/users.services'
import { sendInvitation } from '@approbado/lib/services/chat.services'
import {
    Row,
    Container,
    Text,
    Button,
    MultiSelectInput,
    TextInput
} from '../../../components';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Routes } from '../../routes';
import { useForm } from 'react-hook-form';
import setFormErrors from '@approbado/lib/utils/setFormErrors'

const InviteChat = ({ navigation }) => {
    const { control, handleSubmit, setError, formState, watch } = useForm();
    const { dispatch } = useToast()
    const [users, setUsers] = React.useState(null);
    const selectedUsers = watch('users_ids') ? watch('users_ids') : []

    const onSubmit = async values => {
        const submmitData = {
            users_ids: values.users_ids,
            is_private: values.users_ids.length < 2
        }

        const { success, status, data } = await sendInvitation(submmitData);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Invitación realizada!'
            )
            navigation.navigate(Routes.UserChat, {
                chat: data
            })
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            } else {
                console.log(data)
                await openToast(
                    dispatch,
                    'error',
                    'Ha ocurrido un error.'
                )
            }
        }
    };

    const fetchUsers = React.useCallback(async () => {
        const { success, data } = await listUsers()

        if (success) {
            setUsers(data);
        }
    }, []);

    React.useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Container>
            <Row align='center' direction='row' justify='space-between' size={2}>
                <Text>
                    Invitar usuario
                </Text>
                <Button variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                    Cancelar
                </Button>
            </Row>
            <Row size={1}>
                {users ? (
                    <MultiSelectInput
                        label='Usuario'
                        name='users_ids'
                        control={control}
                        placeholder='Seleccione un usuario'
                        options={users}
                        labelField='user_name'
                        valueField='id'
                    />
                ) : null}
            </Row>
            {selectedUsers.length > 1 ? (
                <Row size={1}>
                    <TextInput
                        control={control}
                        name='name'
                        placeholder='Nombre del chat'
                    />
                </Row>
            ) : null}
            <Row size={2}>
                <Button
                    isLoading={formState.isSubmitting}
                    fullWidth
                    onPress={handleSubmit(onSubmit)}
                >
                    Enviar invitación
                </Button>
            </Row>
        </Container>
    );
}

export default InviteChat
