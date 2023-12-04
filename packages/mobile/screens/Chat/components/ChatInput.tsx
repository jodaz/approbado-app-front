import * as React from 'react'
import { Controller } from 'react-hook-form';
import { ITextInputProps } from '../../../types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { SendHorizonal, SendHorizontal } from 'lucide-react-native';

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
    padding: 10px;
    border-radius: 24px;
    flex: 1;
`;

const RootContainer = styled.View`
    display: flex;
    flexDirection: row;
    align-items: center;
    width: 100%;
`

const Button = styled.TouchableOpacity`
    padding: 10px;
`

interface IChatInputProps extends ITextInputProps {
    onHandleSubmit?: () => void;
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
