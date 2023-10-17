import * as React from 'react'
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';
import { ITextInputProps } from '../screens/types/types';

const Input = styled.TextInput`
    width: 100%;
    height: 45px;
    border: ${props => `2px solid ${props.theme.palette.primary.light}`};
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
`;

const ErrorText = styled.Text`
    color: ${props => props.theme.palette.error.main};
    margin-bottom: 10px;
    width: 100%;
`;

const TextInput = ({
    control,
    validations,
    placeholder,
    name,
    defaultValue
} : ITextInputProps) : JSX.Element => (
    <Controller
        control={control}
        render={({
            field: { onChange, ...restField },
            fieldState: { error },
        }) => (
            <>
                <Input
                    placeholder={placeholder}
                    onChangeText={onChange}
                    {...restField}
                />
                {error && <ErrorText>{validations.messages[error.type]}</ErrorText>}
            </>
        )}
        name={name}
        rules={validations.rules}
        defaultValue={defaultValue}
    />
)

export default TextInput
