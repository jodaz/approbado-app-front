import * as React from 'react';
import { Edit } from '@approbado/lib/icons';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom'

export default function({ id }) {
    const history = useHistory();

    const redirect = () => history.push(`/dashboard/schedules/${id}`)

    return (
        <MenuItem onClick={redirect}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px'
            }}>
                <Edit />
            </Box>
            Editar evento
        </MenuItem>
    );
}
