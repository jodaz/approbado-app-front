import * as React from 'react'
import { alpha } from '@material-ui/core'
import styled from '@material-ui/styles/styled';
import { useMutation } from 'react-admin'
import Button from '@material-ui/core/Button';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useHistory } from 'react-router-dom'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'

const CustomizedButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    border: '1px solid #B7B7B7 !important',
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.dark, 0.9)
    }
}));

const RestrictButton = user => {
    const history = useHistory();
    const { showNotification } = useUiDispatch();
    const [open, setOpen] = React.useState(false);
    const [mutate, { loaded, loading }] = useMutation();

    const handleClick = React.useCallback(async () => {
        try {
            await mutate({
                type: 'update',
                resource: 'blacklisted-users',
                payload: { id: user.id, data: { user_id: user.id, is_restricted: true } }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, user])

    React.useEffect(() => {
        if (loaded) {
            history.push(`reports?tab=blacklisted`)
            showNotification(`¡El usuario @${user.user_name} ahora está en la lista negra!`)
        }
    }, [loaded])

    return (
        <>
            <CustomizedButton size='large' color="pimary" onClick={() => setOpen(!open)}>
                Restringir acceso
            </CustomizedButton>
            <Confirm
                isOpen={open}
                loading={loading}
                title='Restringir acceso'
                content={`¿Está seguro que desea restringir el acceso a ${user.user_name}?`}
                onConfirm={handleClick}
                onClose={() => setOpen(!open)}
                confirmColor='primary'
                confirm='Sí'
            />
        </>
    )
}

export default RestrictButton
