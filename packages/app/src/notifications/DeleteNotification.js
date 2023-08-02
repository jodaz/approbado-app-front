import * as React from 'react';
import Box from '@material-ui/core/Box';
import {
    useNotificationDispatch
} from '@approbado/lib/hooks/useNotifications'
import { Trash2 } from '@approbado/lib/icons';
import MenuItem from '@material-ui/core/MenuItem'
import { axios } from '@approbado/lib/providers';

const DeleteNotification = ({ id, onClick }) => {
    const { deleteNotification } = useNotificationDispatch()
    const ref = React.useRef(null)

    const handleDelete = async () => {
        if (ref.current) {
            try {
                const { data } = await axios.delete(`/notifications/${id}`)

                if (data) {
                    await deleteNotification(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        onClick();
    }

    return (
        <MenuItem
            ref={ref}
            onClick={handleDelete}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px'
            }}>
                <Trash2 />
            </Box>
            Eliminar notificación
        </MenuItem>
    );
}

export default DeleteNotification
