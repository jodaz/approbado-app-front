import * as React from 'react'
import { Controller } from 'react-hook-form';
import { ITextInputProps } from '../types';
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
    border-radius: 4px;
`;

const ErrorText = styled.Text`
    color: ${props => props.theme.palette.error.main};
`;

const TextInput = ({
    control,
    validations,
    placeholder,
    name,
    icon,
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
                <InputContainer>
                    {icon && React.cloneElement(icon, {
                        color: '#000'
                    })}
                    <Input
                        placeholder={placeholder}
                        onChangeText={onChange}
                        {...restField}
                        {...restInputProps}
                    />
                </InputContainer>
                {error && <ErrorText>{validations.messages[error.type]}</ErrorText>}
            </>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default TextInput
