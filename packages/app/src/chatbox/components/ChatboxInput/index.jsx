import * as React from 'react';
import { Send } from '@approbado/lib/icons'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import { makeStyles, alpha, styled } from '@material-ui/core'
import { Field, Form } from 'react-final-form';
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'
import AddImageInput from './AddImageInput'
import { apiProvider as axios } from '@approbado/lib/api'
import { useChatDispatch } from '@approbado/lib/hooks/useChat';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100% !important',
        display: 'flex',
        boxShadow: props => props.focused &&
            (`0px 0px 1px 1px ${alpha(theme.palette.info.main, 0.7)}`)
    },
    input: {
        width: '100%',
        border: 'none',
        flex: 1,
        padding: '0 !important',
        '&.Mui-focused': {
            border: 'none !important',
            boxShadow: 'none !important'
        }
    },
    inputContainer: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 0.3rem',
        width: '100%'
    },
    avatar: {
        margin: '0.5rem 0 0 0',
        padding: '0 0.5rem',
        width: '21px',
        height: '21px',
    },
    focused: {
        boxShadow: `0px 0px 1px 1px ${alpha(theme.palette.info.main, 0.7)}`
    },
    icon: {
        color: theme.palette.primary.main,
        transition: '0.3s',
        alignSelf: 'end',
        '&:hover': {
            backgroundColor: 'unset !important',
            color: `${alpha(theme.palette.primary.main, 0.7)}`
        }
    },
    containerButtons: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: '1',
        paddingLeft: '0.5rem'
    }
}))

const CustomFormControl = styled(FormControl)(() => ({
    width: '100% !important',
    border: 'none !important',
    borderRadius: 6
}));

const ChatInput = () => {
    const { focused } = useFormControl() || {};
    const classes = useStyles({
        focused: focused
    });
    const loading = false;
    const { chat_id } = useParams();
    const { sendMessage } = useChatDispatch();

    const handleSubmit = async (values) => {
        const res = await axios.post(`/chats/${chat_id}/messages`, values)

        if (res.status >= 200 || res.status < 300) {
            await sendMessage(res.data)
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, form }) => (
                <Paper component="form" className={classes.root} onSubmit={async event => {
                    await handleSubmit(event)
                    form.reset()
                }}>
                    <Box className={classes.containerButtons}>
                        <AddImageInput name="file" className={classes.icon} />
                    </Box>
                    <Field name='message'>
                        {({
                            meta: { touched, error } = { touched, error },
                            input: { ...inputProps },
                            ...props
                        }) => (
                            <Box className={classes.inputContainer}>
                                <InputBase
                                    placeholder="Escribe una respuesta"
                                    className={classes.input}
                                    {...inputProps}
                                    {...props}
                                    multiline
                                    disabled={loading}
                                />
                            </Box>
                        )}
                    </Field>
                    <IconButton
                        className={classes.icon}
                        aria-label="send"
                        type='submit'
                        disabled={loading}
                    >
                        <Send />
                    </IconButton>
                </Paper>
            )}
        />
    )
}

export default function () {
    return (
        <CustomFormControl>
            <ChatInput />
        </CustomFormControl>
    );
}
