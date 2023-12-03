import * as React from 'react'
import { Controller } from 'react-hook-form';
import { ITextInputProps } from '../../../types';
import styled from 'styled-components/native';

const Input = styled.TextInput`
    width: 100%;
    height: 45px;
    font-size: 16px;
    padding: 0 10px;
`;

const InputContainer = styled.View`
    display: flex;
    border: ${props => `1px solid ${props.theme.palette.primary.light}`};
    flexDirection: row;
    height: fit-content;
    width: 100%;
    alignItems: center;
    padding: 10px;
    border-radius: 24px;
`;

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const ChatInput = ({
    control,
    validations,
    placeholder,
    name,
    icon,
    label,
    defaultValue,
    ...restInputProps
} : ITextInputProps) : JSX.Element => (
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
            </RootContainer>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default ChatInput
