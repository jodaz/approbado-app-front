import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@approbado/lib/components/Button'
import Box from '@material-ui/core/Box';
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form } from 'react-final-form'
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import SelectInput from '@approbado/lib/components/SelectInput'
import { apiProvider as axios } from '@approbado/lib/api'
import ClipboardCopyField from './ClipboardCopyField'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import Chip from '@material-ui/core/Chip';
import Avatar from '@approbado/lib/components/Avatar';
import ItemCollection from '@approbado/lib/components/ItemCollection';
import { Close, PlusCircle } from '@approbado/lib/icons'

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
    }
}));

const validate = (values) => {
    const errors = {};

    if (!values.user_ids) {
        errors.user_ids = "Ingrese al menos un participante.";
    }

    return errors;
}

const AddFriendsModal = () => {
    const classes = useStyles();
    const [addFriends, setAddFriends] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState([])
    const [link, setLink] = React.useState({ token: '', link: '' })
    const {
        configs: {
            level, type
        },
        selectedSubthemes,
        room
    } = useTriviaState()
    const { setRoom } = useTriviaDispatch()

    const fetchUsers = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/users?filter[is_registered]=true')
        setUsers(data)
    }, []);

    const fetchLink = React.useCallback(async () => {
        const { data } = await axios.get('/trivias/grupal/link')

        setLink(data)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
        fetchUsers();
    };

    const handleClose = e => {
        setOpen(false);
    };

    const handleSubmit = async (values) => {
        try {
            const { data } = await axios.post('/trivias/grupal', values)

            setOpen(false);
            setRoom(data);
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    };

    React.useEffect(() => {
        fetchLink();
    }, [])

    return (
        <>
            <Box marginBottom='1rem'>
                <Box className={classes.test} onClick={handleClickOpen}>
                    <Box>
                        <PlusCircle />
                    </Box>
                    <Box className={classes.link} onClick={() => setAddFriends(!addFriends)}>
                        Agregar amigos
                    </Box>
                </Box>
                {(room.participants.length > 0) && (
                    <Box display='flex' marginLeft='3rem'>
                        <ItemCollection items={room.participants} label='names' />
                    </Box>
                )}
            </Box>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                classes={{
                    paperWidthSm: classes.dialogRoot
                }}
            >
                <DialogTitle className={classes.title}>
                    <Box sx={{ fontWeight: 600, padding: '0.5rem 0' }}>
                        Trivia grupal
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
                        initialValues={{
                            link: link.link,
                            level_id: level,
                            type: type,
                            subtheme_id: selectedSubthemes[0].id
                        }}
                        render={ ({ handleSubmit, submitting }) => (
                            <Box
                                width='100%'
                                display='flex'
                                justifyContent="center"
                                flexDirection='column'
                            >
                                <InputContainer
                                    disabled={submitting}
                                    label="Añadir participantes"
                                    md={12}
                                    xs={12}
                                >
                                    <SelectInput
                                        name='user_ids'
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
                                <InputContainer sx='12' md='12' label="Compartir link">
                                    <ClipboardCopyField name="link" disabled />
                                </InputContainer>
                                <Box sx={{ marginTop: '1rem' }}>
                                    <Link
                                        to='/dashboard/schedules'
                                        className={classes.link}
                                        component={LinkBehavior}
                                    >
                                        Agendar una trivia grupal
                                    </Link>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    paddingTop: '1rem'
                                }}>
                                    <Button
                                        onClick={handleClose}
                                        disabled={submitting}
                                        className={classes.cancelButton}
                                        unresponsive
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        disabled={submitting}
                                        unresponsive
                                        onClick={handleSubmit}
                                    >
                                        Crear sala
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

export default AddFriendsModal;
