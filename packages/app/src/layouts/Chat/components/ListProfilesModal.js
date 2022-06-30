import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@approbado/lib/components/Button'
import Box from '@material-ui/core/Box';
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form } from 'react-final-form'
import SelectInput from '@approbado/lib/components/SelectInput'
import { axios, history } from '@approbado/lib/providers'
import configs from '@approbado/lib/configs'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { useChatState } from '@approbado/lib/hooks/useChat';
import { useDialogDispatch, useDialogState } from '@approbado/lib/hooks/useDialog'

const useStyles = makeStyles(theme => ({
    dialogRoot: {
        margin: 'unset !important',
        width: '80% !important',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'end'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: 'inherit',
        alignSelf: 'center'
    },
    padding: {
        padding: '0.5rem 1rem',
        borderRadius: '6px'
    },
    test: {
        display: 'flex',
        marginBottom: '0.75rem',
        '& > :first-child': {
            display: 'flex',
            justifyContent: 'start',
            width: '3rem'
        }
    },
    cancelButton: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
        fontWeight: 600,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.light, 0.9)
        }
    },
    link: {
        textDecoration: 'underline',
        color: theme.palette.info.main,
        cursor: 'pointer'
    },
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    chip: {
        padding: '4px 4px 4px 8px !important',
        backgroundColor: '#EAEAEA !important',
        borderRadius: '6px',
        fontWeight: 600,
        color: theme.palette.info.dark
    },
    menuItem: {
        padding: '0.8rem 1rem',
        '& :nth-child(1)': {
            marginRight: '1rem'
        }
    }
}));

const validate = (values) => {
    const errors = {};

    if (!values.users_ids) {
        errors.users_ids = "Ingrese al menos un participante.";
    } else {
        if (values.users_ids.length > 1 && !values.name) {
            errors.name = "Ingrese un nombre para el chat grupal.";
        }
    }
    console.log(errors)
    return errors;
}


const ListProfilesModal = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const anchorRef = React.useRef(null);
    const { requestChat } = useChatState();
    const { status } = useDialogState('profiles.modal')
    const { unsetDialog } = useDialogDispatch('profiles.modal')

    const fetchUsers = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/users?filter[is_registered]=true')
        setUsers(data)
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        unsetDialog()
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            unsetDialog()
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleSubmit = async (values) => {
        try {
            const submmitData = {
                ...values,
                is_private: values.users_ids.length < 2
            }
            const { data } = await axios.post('/chats', submmitData)

            history.push(`/chats/${data.id}`)
            requestChat(data)
            handleToggle();
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    };

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
            </DialogContent>
        </Dialog>
    );
}

export default ListProfilesModal;
