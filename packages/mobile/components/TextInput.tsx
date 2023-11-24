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

const LabelText = styled.Text`
    color: ${props => props.theme.palette.info.light};
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    letter-spacing: 1px;
`;

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const TextInput = ({
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
            fieldState: { error },
        }) => (
            <RootContainer>
                {label ? (
                    <LabelText>
                        {label}
                    </LabelText>
                ) : null}
                <InputContainer>
                    {icon ? React.cloneElement(icon, {
                        color: '#000'
                    }) : null}
                    <Input
                        placeholder={placeholder}
                        onChangeText={onChange}
                        {...restField}
                        {...restInputProps}
                    />
                </InputContainer>
                {(error && validations) ? <ErrorText>{validations.messages[error.type]}</ErrorText> : null}
            </RootContainer>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default TextInput
