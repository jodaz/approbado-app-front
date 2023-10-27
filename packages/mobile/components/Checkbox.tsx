import React from 'react';
import { Controller } from 'react-hook-form';
import { ICheckboxProps } from '../types';
import styled from 'styled-components/native';
import ExpoCheckbox from 'expo-checkbox';

const CheckboxContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const CheckboxLabel = styled.Text`
    font-size: 14px;
    margin-left: 10px;
`;

const CheckboxStyled = styled(ExpoCheckbox)`
    color: blue;
`

const Checkbox = ({ control, name, label } : ICheckboxProps) : JSX.Element => (
    <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <CheckboxContainer>
                <CheckboxStyled
                    value={value}
                    onValueChange={onChange}
                    color='#206FCA'
                />
                <CheckboxLabel>{label}</CheckboxLabel>
            </CheckboxContainer>
        )}
        name={name}
        defaultValue={false}
    />
);

export default Checkbox;
