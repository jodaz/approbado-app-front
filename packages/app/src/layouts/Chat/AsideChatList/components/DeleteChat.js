import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import { axios } from '@approbado/lib/providers'
import { ReactComponent as TrashIcon } from '@approbado/lib/icons/Trash.svg'
import { useChatDispatch } from '@approbado/lib/hooks/useChat';
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useHistory, useParams } from 'react-router-dom'

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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '2rem',
        padding: '1rem 0',
        alignSelf: 'center',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60%'
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

export default function({ onClick, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    const { deleteChat } = useChatDispatch();
    const { id: paramsId } = useParams();
    const { showNotification } = useUiDispatch();
    const history = useHistory();

    const handleClickOpen = e => {
        setOpen(true);
        onClick();
    };

    const handleClose = e => {
        setOpen(false);
    };

    const handleDelete = React.useCallback(async () => {
        try {
            const { data } = await axios.delete(`/chats/${id}`)

            if (data) {
                await history.push('/chats')
                showNotification('¡Chat eliminado!')
                await deleteChat(data)
                await handleClose();
            }
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <>
            <MenuItem ref={ref} onClick={handleClickOpen} className={classes.menuItem}>
                <TrashIcon />
                Eliminar chat
            </MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={classes.title}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
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
                            ¿Estás seguro que deseas eliminar este chat?
                        </Box>
                        <Box sx={{ fontWeight: 400 }}>
                            Si eliminas este chat, ya no podrás acceder a los mensajes.
                        </Box>
                    </Box>
                    <Box className={classes.buttonContainer}>
                        <Button onClick={handleClose} className={classes.cancelButton}>
                            Cancelar
                        </Button>
                        <Button className={classes.submitButton} onClick={handleDelete}>
                            Sí, quiero continuar
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
