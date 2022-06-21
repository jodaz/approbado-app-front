import * as React from 'react';
import { useUiDispatch } from '@approbado/lib/hooks/useUI';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem'
import InformationIcon from '@approbado/lib/icons/InformationIcon'
import Box from '@material-ui/core/Box'
import { axios } from '@approbado/lib/providers'
import ListReportReasons from './ListReportReasons'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
    () => ({
        title: {
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.18)",
            '& > *': {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: '1rem',
                paddingRight: '0.5rem',
                alignItems: 'center'
            }
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        padding: {
            padding: '0.5rem 1rem',
            borderRadius: '6px'
        }
    }),
    { name: 'RaDialog' }
);

export default function ReportDialog({ post_id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [reasonID, setReasonID] = React.useState(null);
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();

    const handleListItemClick = (event, index) => {
        setReasonID(index);
        event.stopPropagation();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
        setReasonID(null);
    };

    const handleSubmit = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/reports', {
                reason_id: reasonID,
                post_id: post_id
            })

            if (data) {
                showNotification('¡Ha reportado la publicación exitosamente!');
                refresh();
                handleClose();
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
        setLoading(false);
    }, [reasonID, post_id]);

    return (
        <div>
            <MenuItem onClick={handleClickOpen}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                }}>
                    <InformationIcon />
                </Box>
                    Reportar
            </MenuItem>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle className={classes.title}>
                    <Typography variant="subtitle1">
                        Reportar una publicación
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Typography variant="subtitle1" className={classes.padding}>
                        {'Ayúdanos a entender el problema'}
                    </Typography>
                    <ListReportReasons
                        handleClick={handleListItemClick}
                        reasonID={reasonID}
                    />
                    {(reasonID) && (
                        <Button disabled={loading} onClick={handleSubmit} color="primary">
                            {'Enviar'}
                        </Button>
                    )}
                    <Typography variant="body2"  className={classes.padding}>
                        Para más infomación sobre advertencia y sanciones, click aquí
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
