import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import Label from './Label';
import Error from './ErrorText';
import styled from 'styled-components/native';

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

interface IMultiSelectProps {
    control: any;
    name: string;
    options: any;
    label?: string;
    placeholder?: string;
    validations?: any;
    defaultValue?: any;
    valueField?: string;
    labelField?: string;
}

const MultiSelectInput = ({
    control,
    labelField = 'label',
    valueField = 'value',
    name,
    validations,
    options = [],
    defaultValue = [],
    label,
    placeholder = 'Seleccione'
} : IMultiSelectProps) => {
    const [selected, setSelected] = useState(defaultValue);

    return (
        <Controller
            control={control}
            render={({
                field: { onChange, value, ...restField },
                fieldState: { error },
            }) => (
                <RootContainer>
                    {label ? (
                        <Label>
                            {label}
                        </Label>
                    ) : null}
                    <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={options}
                        labelField={labelField}
                        valueField={valueField}
                        placeholder={placeholder}
                        searchPlaceholder={placeholder}
                        value={value}
                        onChange={item => {
                            onChange(item)
                        }}
                        selectedStyle={styles.selectedStyle}
                    />
                    {(error && validations) ? <Error>{validations.messages[error.type]}</Error> : null}
                </RootContainer>
            )}
            name={name}
            rules={validations?.rules}
            defaultValue={defaultValue}
        />
    );
};

export default MultiSelectInput;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
