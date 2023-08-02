import * as React from 'react';
import { Edit } from '@approbado/lib/icons';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom'

const LinkButton = ({ to, label, icon }) => {
    const history = useHistory();

    const redirect = () => history.push(to)

    return (
        <MenuItem onClick={redirect}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px'
            }}>
                {icon}
            </Box>
            {label}
        </MenuItem>
    );
}

LinkButton.defaultProps = {
    icon: <Edit />,
    label: 'Editar'
}

export default LinkButton
