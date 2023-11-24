import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';
import Label from './Label';
import Error from './ErrorText';
import { ISelectProps } from '../types';

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const SelectInput = ({
    control,
    label,
    name,
    validations,
    defaultValue,
    placeholder,
    options,
    labelField,
    valueField
} : ISelectProps) => {
  const [value, setValue] = useState(null);

  return (
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
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={options}
                    search
                    maxHeight={300}
                    labelField={labelField}
                    valueField={valueField}
                    placeholder={placeholder}
                    searchPlaceholder={placeholder}
                    value={value}
                    onChange={item => {
                        onChange(item.value)
                        setValue(item.value);
                    }}
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

SelectInput.defaultProps = {
    labelField: 'label',
    valueField: 'value'
}

export default SelectInput;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderWidth: 1,
    width: 'auto',
    borderColor: '#000',
    padding: 10,
    borderRadius: 6
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
