import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { MultiSelect } from 'react-native-element-dropdown';
import { horizontalScale, scaleFontSize, verticalScale } from '../styles/scaling';
import Label from './Label';
import Error from './ErrorText';
import styled, { useTheme } from 'styled-components/native';

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const LoadingSelectInput = styled(RootContainer)`
    border: ${props => `1px solid ${props.theme.palette.secondary.main}`};
    padding-vertical: ${verticalScale(12)};
    border-radius: ${scaleFontSize(6)}px;
`;

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
    loading?: boolean;
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
    loading,
    placeholder = 'Seleccione',
    ...restProps
} : IMultiSelectProps) => {
    const theme = useTheme()

    if (loading) {
        return (
            <RootContainer>
                {label ? (
                    <Label>
                        {label}
                    </Label>
                ) : null}
                <LoadingSelectInput>
                    <ActivityIndicator color={theme.palette.secondary.main} />
                </LoadingSelectInput>
            </RootContainer>
        )
    }

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
