import * as React from 'react'
import {
    DialogTitle,
    IconButton,
    Dialog,
    Typography,
    Button,
    makeStyles
} from '@material-ui/core'
import { CheckCircle, Close } from '../icons';
import { useUiState, useUiDispatch } from '@approbado/lib/hooks/useUI'

const useStyles = makeStyles(() => ({
    button: {
        background: "linear-gradient(135.16deg, #E6EA00 -22.35%, #FDE000 113.73%)",
        boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        textTransform: 'none',
        boxShadow: "4px 4px 40px 0px #00000014",
        padding: '0.7rem 2rem',
        marginTop: '2rem',
        fontWeight: 'bold'
    },
}))

const CustomDialogTitle = ({ handleClose }) => (
    <DialogTitle style={{ textAlign: 'right' }}>
        {handleClose ? (
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <Close />
        </IconButton>
        ) : null}
    </DialogTitle>
)

const Notification = ({
    autoHideDuration = 3000
}) => {
    const [open, setOpen] = React.useState(false);
    const { hideNotification } = useUiDispatch();
    const { notification } = useUiState();
    const classes = useStyles();
    const timerAutoHide = React.useRef();

    const setAutoHideTimer = React.useCallback(autoHideDurationParam => {
        clearTimeout(timerAutoHide.current);
        timerAutoHide.current = setTimeout(function () {
            handleClose();
        }, autoHideDurationParam);
    });

    React.useEffect(function () {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }

        return function () {
            clearTimeout(timerAutoHide.current);
        };
    }, [open, setAutoHideTimer]);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        hideNotification()
    }, [setOpen]);

    React.useEffect(() => {
        setOpen(!!notification.message);
    }, [notification.message]);

    return (
        <Dialog open={open} handleClose={handleClose} title={<CustomDialogTitle handleClose={handleClose} />}>
            <Typography gutterBottom>
                {notification.message}
            </Typography>
            <CheckCircle size='2em' />
            <Button onClick={handleClose} className={classes.button}>
                <Typography variant="subtitle1">
                    Continuar
                </Typography>
            </Button>
        </Dialog>
    )
}

export default Notification;
