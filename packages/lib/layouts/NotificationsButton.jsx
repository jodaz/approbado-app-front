import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled,
    Badge
} from '@material-ui/core';
import { Bell } from '../icons';
import { useHistory } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import CONFIG_NAMES from '@approbado/lib/env'
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
                    <Bell />
                </CustomIconButton>
            </Badge>
        </Tooltip>
    );
};

export default NotificationsButton;
