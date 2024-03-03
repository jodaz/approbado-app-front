import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Controller } from 'react-hook-form';
import { ISelectProps } from '../types';
import styled from 'styled-components/native';
import Label from './Label';
import Error from './ErrorText';

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const SelectInput = ({
    control,
    label,
    name,
    icon,
    validations,
    defaultValue,
    placeholder,
    options,
    labelField,
    valueField
} : ISelectProps) => {

    const leftIcon = () => {
        if (typeof(icon) === null) return null;

        return React.cloneElement(icon, {
            size: 20,
            color: '#000',
            style: {
                marginRight: 8
            }
        })
    };

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
                        data={options}
                        search
                        maxHeight={300}
                        labelField={labelField}
                        valueField={valueField}
                        placeholder={placeholder}
                        searchPlaceholder={placeholder}
                        onChange={item => {
                            onChange(item[valueField])
                        }}
                        {...restField}
                        renderLeftIcon={leftIcon}
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
    valueField: 'value',
    icon: null
}

export default SelectInput;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
    width: 'auto',
    borderColor: '#000',
    padding: 10,
    borderRadius: 6
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
