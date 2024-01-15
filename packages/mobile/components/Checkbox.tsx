import React from 'react';
import { Controller } from 'react-hook-form';
import { ICheckboxProps } from '../types';
import { scaleFontSize } from '../styles/scaling';
import { Check } from 'lucide-react-native';
import styled from 'styled-components/native';
import Text from './Text';

const CheckboxContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: flex-start;
`;

const CheckboxLabel = styled(Text)`
    margin-left: 10px;
    margin-top: 0;
    padding-top: 0;
`;

const StyledCheckbox = styled.View`
    border-radius: ${scaleFontSize(8)}px;
    height: ${scaleFontSize(24)}px;
    width: ${scaleFontSize(24)}px;
    background-color: ${props => props.isPressed
        ? props.theme.palette.info.main
        : 'transparent'};
    border-width: ${scaleFontSize(2)}px;
    border-color: ${props => props.theme.palette.info.main};
    justify-content: center;
    align-items: center;
`

const Checkbox = ({ control, name, label } : ICheckboxProps) : JSX.Element => (
    <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <CheckboxContainer onPress={() => onChange(!value)}>
                <StyledCheckbox isPressed={value}>
                    {value ? <Check color='#fff' size={18} /> : null}
                </StyledCheckbox>
                <CheckboxLabel
                    fontSize={17}
                    fontWeight={400}
                >
                    {label}
                </CheckboxLabel>
            </CheckboxContainer>
        )}
        name={name}
        defaultValue={false}
    />
);

export default Checkbox;
