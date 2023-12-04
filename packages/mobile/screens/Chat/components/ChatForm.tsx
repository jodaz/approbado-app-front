import * as React from 'react';
import { Row } from '../../../components';
import { useForm } from "react-hook-form";
import { sendMessage } from '@approbado/lib/services/chat.services'
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import ChatInput from './ChatInput';

type ChatFormValues = {
    message: string;
}

interface IChatFormProps {
    chat_id: number;
}

const Container = styled(Row)`
    background-color: #fff;
`

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
            const { success } = await sendMessage(chat_id, values)

            if (success) {
                setValue('message', '')
            }
        }
    }, [chat_id]);

    return (
        <Container direction='row'>
            <ChatInput
                style={classes.input}
                name='message'
                control={control}
                placeholder='Escribir un mensaje'
                onHandleSubmit={handleSubmit(onSubmit)}
            />
        </Container>
    );
}

const classes = StyleSheet.create({
    input: {
        borderRadius: 20
    }
})

export default ChatForm
