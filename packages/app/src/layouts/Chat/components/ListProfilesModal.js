import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { history } from '@approbado/lib/providers'
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { useDialogDispatch, useDialogState } from '@approbado/lib/hooks/useDialog'
import CONFIG_NAMES from '@approbado/lib/configs';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
    dialogRoot: {
        margin: 'unset !important',
        width: '80% !important',
        overflow: 'hidden',
        maxWidth: 300,
    },
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'unset',
        justifyContent: 'center',
        '& > *': {
            margin: '0.5rem',
            cursor: 'pointer'
        }
    },
    padding: {
        padding: '0.5rem 1rem',
        borderRadius: '6px'
    },
}));

const ListProfilesModal = () => {
    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const { status, data } = useDialogState('profiles.modal')
    const { unsetDialog } = useDialogDispatch('profiles.modal')

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        unsetDialog()
    };

    const handleUserRedirect = id => {
        history.push(`/users/${id}`)
        unsetDialog()
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            unsetDialog()
        }
    }

    if (!status) return null;

    const { participants } = data;

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={status}
            classes={{
                paperWidthSm: classes.dialogRoot
            }}
            onKeyDown={handleListKeyDown}
        >
            <DialogTitle className={classes.title}>
                <Box sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    Integrantes
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {participants.map(user => (
                    <Tooltip title={user.names}>
                        <Avatar
                            src={`${CONFIG_NAMES.SOURCE}/${user.picture}`}
                            alt={`${user.names}_picture`}
                            onClick={() => handleUserRedirect(user.id)}
                        />
                    </Tooltip>
                ))}
            </DialogContent>
        </Dialog>
    );
}

export default ListProfilesModal;
