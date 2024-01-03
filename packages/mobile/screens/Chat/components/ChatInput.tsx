import * as React from 'react'
import { Controller } from 'react-hook-form';
import { ITextInputProps } from '../../../types';
import styled from 'styled-components/native';
import { SendHorizontal } from 'lucide-react-native';
import PhotoInput from '../../../components/PhotoInput';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const Input = styled.TextInput`
    height: 45px;
    font-size: 16px;
    padding: 0 10px;
    flex: 1;
`;

const InputContainer = styled.View`
    display: flex;
    border: ${props => `1px solid ${props.theme.palette.primary.light}`};
    flexDirection: row;
    height: fit-content;
    alignItems: center;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    border-radius: 24px;
    flex: 1;
`;

const RootContainer = styled.View`
    display: flex;
    flexDirection: row;
    align-items: center;
    width: 100%;
    background-color: white;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
`

const Button = styled.TouchableOpacity`
    padding: 10px;
`

interface IChatInputProps extends ITextInputProps {
    onHandleSubmit?: () => void;
    chat_id?: any;
}

const ChatInput = ({
    control,
    validations,
    placeholder,
    name,
    icon,
    label,
    defaultValue,
    onHandleSubmit,
    chat_id,
    ...restInputProps
} : IChatInputProps) : JSX.Element => (
    <Controller
        control={control}
        render={({
            field: { onChange, ...restField },
        }) => (
            <RootContainer>
                <InputContainer>
                    <Input
                        placeholder={placeholder}
                        onChangeText={onChange}
                        {...restField}
                        {...restInputProps}
                    />
                </InputContainer>
                <PhotoInput chat_id={chat_id} />
                <Button onPress={onHandleSubmit}>
                    <SendHorizontal color='#2280ED' size={24} />
                </Button>
            </RootContainer>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default ChatInput
