import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import TextInput from '../../components/TextInput';
import { LoadingButton } from '@mui/lab';
import { sendMessage } from '@approbado/lib/services/chat.services'

type ChatFormValues = {
    message: string;
}

interface IChatFormProps {
    chat_id: number;
}

const ChatForm: React.FC<IChatFormProps> = ({ chat_id }) => {
    const { control, handleSubmit, setValue, formState: {
        isSubmitting
    }} = useForm<ChatFormValues>({
        reValidateMode: "onBlur",
        defaultValues: {
            message: ''
        }
    });

    const onSubmit = React.useCallback(async (values: ChatFormValues) => {
        if (values.message) {
            const { success, data } = await sendMessage(chat_id, values)

            if (success) {
                setValue('message', '')
            }
        }
    }, [chat_id]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.08)'
        }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: 1, color: 'black' }}>
                <TextInput
                    name='message'
                    control={control}
                    placeholder='Escribir un mensaje'
                    endAdornment={
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            loading={isSubmitting}
                            type="submit"
                        >
                            Enviar
                        </LoadingButton>
                    }
                    sx={{
                        bgcolor: '#E6EBEF'
                    }}
                />
            </Box>
        </Box>
    );
}

export default ChatForm
