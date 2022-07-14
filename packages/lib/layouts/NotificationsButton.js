import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import NotificationIcon from '@approbado/lib/icons/NotificationIcon'
import { useHistory } from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import socketIOClient from "socket.io-client";
import CONFIG_NAMES from '@approbado/lib/configs'
import { useUserState } from '@approbado/lib/hooks/useUserState'

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
}));

const NotificationsButton = () => {
    const history = useHistory();
    const [invisible, setInvisible] = React.useState(false)
    const { user } = useUserState();

    React.useEffect(() => {
        const socket = socketIOClient(CONFIG_NAMES.SOURCE);

        socket.on("new_notification", data => console.log(data));

        return () => socket.disconnect();
    }, [])

    return (
        <Tooltip
            title='Ver notificaciones'
            enterDelay={500}
        >
            <Badge color="secondary" variant="dot" invisible={!invisible}>
                <CustomIconButton
                    onClick={() => history.push('/notifications')}
                >
                    <NotificationIcon />
                </CustomIconButton>
            </Badge>
        </Tooltip>
    );
};

export default NotificationsButton;
