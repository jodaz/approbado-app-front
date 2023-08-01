import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import { useDialogDispatch, useDialogState } from '@approbado/lib/hooks/useDialog'
import { useChatDispatch } from '@approbado/lib/hooks/useChat';
import { useUserState } from '@approbado/lib/hooks/useUserState'

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'end'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    padding: {
        padding: '0.5rem 1rem',
        borderRadius: '6px'
    },
    cancelButton: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.light, 0.9)
        }
    },
    submitButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.light,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: alpha(theme.palette.error.main, 0.9)
        }
    },
    menuItem: {
        padding: '0.8rem 1rem',
        width: '100%',
        '& :nth-child(1)': {
            marginRight: '1rem'
        }
    }
}));

export default function() {
    const classes = useStyles();
    const ref = React.useRef(null);
    const { acceptChat } = useChatDispatch();
    const [isLoading, setIsLoading] = React.useState(false)
    const { status, data } = useDialogState('leavegroup.dialog')
    const { unsetDialog } = useDialogDispatch('leavegroup.dialog')
    const { user } = useUserState();

    const handleLeave = async () => {
        setIsLoading(true)

        const res = await axios.put(`/chats/status/${data.id}/${user.id}`, {
            status: 'leaved'
        })

        if (res.status >= 200 && res.status <= 300) {
            acceptChat('leaved')
            unsetDialog();
        }
        setIsLoading(false)
    }

    if (!status) return null;

    return (
        <Dialog open={status} onClose={unsetDialog}>
            <DialogTitle className={classes.title}>
                <IconButton
                    aria-label="close"
                    onClick={unsetDialog}
                    unresponsive
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'inherit'
                }}>
                    <Box sx={{ fontWeight: 600 }}>
                        ¿Estás seguro que deseas salir del grupo "{data.name}"?
                    </Box>
                    <Box sx={{ fontWeight: 400 }}>
                        Si sales del grupo, ya no podrás publicar mensajes en él.
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '2rem',
                    padding: '1rem 0',
                    width: '100%'
                }}>
                    <Button
                        onClick={unsetDialog}
                        className={classes.cancelButton}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className={classes.submitButton}
                        onClick={handleLeave}
                    >
                        Sí, quiero continuar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
