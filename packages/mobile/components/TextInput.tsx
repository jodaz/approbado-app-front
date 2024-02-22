import * as React from 'react'
import { Controller } from 'react-hook-form';
import { ITextInputProps } from '../types';
import Label from './Label';
import styled from 'styled-components/native';
import Error from './ErrorText';
import { horizontalScale, verticalScale } from '../styles/scaling';

const Input = styled.TextInput`
    width: 100%;
    height: 45px;
    font-size: 16px;
    padding: 0 10px;
`;

const InputContainer = styled.View`
    display: flex;
    border: ${props => `1px solid ${props.theme.palette.primary.dark}`};
    flexDirection: row;
    height: fit-content;
    width: 100%;
    alignItems: center;
    padding-horizontal: ${horizontalScale(10)}px;
    padding-vertical: ${verticalScale(2)}px;
    border-radius: 4px;
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
                    <Label>
                        {label}
                    </Label>
                ) : null}
                <InputContainer>
                    {icon ? React.cloneElement(icon, {
                        color: '#000',
                        size: 20
                    }) : null}
                    <Input
                        placeholder={placeholder}
                        onChangeText={onChange}
                        {...restField}
                        {...restInputProps}
                    />
                </InputContainer>
                {(error && validations) ? <Error>{validations.messages[error.type]}</Error> : null}
            </RootContainer>
        )}
        name={name}
        rules={validations?.rules}
        defaultValue={defaultValue}
    />
)

export default TextInput
