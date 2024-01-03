import * as React from 'react';
import Avatar from '@approbado/lib/components/Avatar';
import { Close, MessageSquarePlus } from '@approbado/lib/icons'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form } from 'react-final-form'
import SelectInput from '@approbado/lib/components/SelectInput'
import { axios, history } from '@approbado/lib/providers'
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ChatNameInput from './ChatNameInput'
import { useChatDispatch } from '@approbado/lib/hooks/useChat';

const useStyles = makeStyles(theme => ({
    dialogRoot: {
        margin: 'unset !important',
        width: '80% !important',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '2rem',
        padding: '1rem 0',
        alignSelf: 'center',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30%',
            alignSelf: 'end',
            justifyContent: 'space-between'
        }
    },
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

    return errors;
}


const MessageRequestModal = ({ handleCloseMenu }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const anchorRef = React.useRef(null);
    const { requestChat } = useChatDispatch();

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

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
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
            const res = await axios.post('/chats', submmitData)


            if (res.status >= 200 && res.status <= 300) {
                history.push(`/chats/${res.data.id}`)
                handleCloseMenu();
                requestChat(res.data)
                handleToggle();
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    };

    return (
        <>
            <MenuItem
                ref={anchorRef}
                onClick={(e) => {
                    handleToggle()
                    fetchUsers();
                }}
                className={classes.menuItem}
            >
                <MessageSquarePlus />
                Solicitud de mensajes
            </MenuItem>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                classes={{
                    paperWidthSm: classes.dialogRoot
                }}
                onKeyDown={handleListKeyDown}
            >
                <DialogTitle className={classes.title}>
                    <Box sx={{ fontWeight: 600, padding: '0.5rem 0' }}>
                        Nueva solicitud de mensaje
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
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Form
                        onSubmit={handleSubmit}
                        validate={validate}
                        render={ ({ handleSubmit, submitting }) => (
                            <Box
                                width='100%'
                                display='flex'
                                justifyContent="center"
                                flexDirection='column'
                            >
                                <ChatNameInput />
                                <InputContainer
                                    disabled={submitting}
                                    label="Añadir participantes"
                                    md={12}
                                    xs={12}
                                >
                                    <SelectInput
                                        name='users_ids'
                                        options={users}
                                        multiple
                                        placeholder='Ingresar jugadores (máx: 5)'
                                        noOptionsText='Sin opciones'
                                        property='names'
                                        renderOption={(option, { selected }) => (
                                            <Box className={classes.userCard}>
                                                <Avatar
                                                    source={option.picture}
                                                    alt='photo_profile'
                                                />
                                                <Box className={classes.userInfo}>
                                                    <Box sx={{
                                                        fontSize: '0.9rem',
                                                        fontSize: '1rem',
                                                        fontWeight: 600
                                                    }}>
                                                        {option.names}
                                                    </Box>
                                                    <Box sx={{
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600,
                                                        color: '#6D6D6D'
                                                    }}>
                                                        {option.email}
                                                    </Box>
                                                </Box >
                                            </Box>
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option.names}
                                                    size="small"
                                                    classes={{ root: classes.chip }}
                                                    deleteIcon={<Close />}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                    />
                                </InputContainer>
                                <Box className={classes.buttonContainer}>
                                    <Button
                                        onClick={handleClose}
                                        disabled={submitting}
                                        className={classes.cancelButton}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        disabled={submitting}
                                        onClick={handleSubmit}
                                        color='primary'
                                    >
                                        Invitar
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MessageRequestModal;
