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
    renderItem?: any;
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
    placeholder = 'Seleccione',
    ...restProps
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
                        {...restProps}
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
