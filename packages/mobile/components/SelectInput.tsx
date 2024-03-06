import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Controller } from 'react-hook-form';
import { ISelectProps } from '../types';
import { horizontalScale, scaleFontSize, verticalScale } from '../styles/scaling';
import styled, { useTheme } from 'styled-components/native';
import Label from './Label';
import Error from './ErrorText';
import Text from './Text';

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const LoadingSelectInput = styled(RootContainer)`
    border: ${props => `1px solid ${props.theme.palette.secondary.main}`};
    padding-vertical: ${verticalScale(12)};
    border-radius: ${scaleFontSize(6)}px;
    padding-horizontal: ${horizontalScale(12)};
`;

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
    const theme = useTheme()

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

    if (!options || !options.length) {
        return (
            <RootContainer>
                {label ? (
                    <Label>
                        {label}
                    </Label>
                ) : null}
                <LoadingSelectInput>
                    <Text fontWeight={400} fontSize={18}>
                        Sin opciones disponibles
                    </Text>
                </LoadingSelectInput>
            </RootContainer>
        )
    }

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
                    {(error && validations)
                        ? <Error>{validations.messages[error.type]}</Error>
                        : null}
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
    icon: null,
    options: []
}

export default SelectInput;

const styles = StyleSheet.create({
  dropdown: {
    height: verticalScale(40),
    borderWidth: 1,
    width: 'auto',
    borderColor: '#000',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: scaleFontSize(6)
  },
  placeholderStyle: {
    fontSize: scaleFontSize(18),
  },
  selectedTextStyle: {
    fontSize: scaleFontSize(18),
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: scaleFontSize(18),
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
    marginTop: verticalScale(8),
    marginRight: horizontalScale(12),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
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
    fontSize: scaleFontSize(20),
  },
});
