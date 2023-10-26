import * as React from 'react'
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';
import { ITextInputProps } from '../types';

const Input = styled.TextInput`
    width: 100%;
    height: 45px;
    border: ${props => `2px solid ${props.theme.palette.primary.light}`};
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
`;

const ErrorText = styled.Text`
    color: ${props => props.theme.palette.error.main};
    width: 100%;
`;

const TextInput = ({
    control,
    validations,
    placeholder,
    name,
    defaultValue,
    ...restInputProps
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
                    {...restInputProps}
                />
                {error && <ErrorText>{validations.messages[error.type]}</ErrorText>}
            </>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default TextInput
