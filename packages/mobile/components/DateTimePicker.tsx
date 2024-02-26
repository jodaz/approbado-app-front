import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { horizontalScale, verticalScale } from '../styles/scaling';
import { Calendar } from 'lucide-react-native';
import { format } from 'date-fns'
import  RNDateTimePicker from '@react-native-community/datetimepicker';
import Text from './Text';
import Label from './Label';
import styled from 'styled-components';

const OuterBox = styled.TouchableOpacity`
    display: flex;
    border: ${props => `1px solid ${props.theme.palette.primary.dark}`};
    flexDirection: row;
    height: fit-content;
    width: 100%;
    alignItems: center;
    padding-horizontal: ${horizontalScale(4)}px;
    padding-vertical: ${verticalScale(8)}px;
    border-radius: 4px;
`

const RootContainer = styled.View`
    display: flex;
    flexDirection: column;
`

const DateTimePicker = ({ control, label, name, mode, icon }) => {
    const defaultDate = new Date();
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => setShowPicker(!showPicker)

    const formatValue = (value: Date) => {
        if (mode === 'date') return format(value, 'dd/MM/yyyy');

        return format(value, 'HH:mm')
    }

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultDate}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <RootContainer>
                    {label ? (
                        <Label>
                            {label}
                        </Label>
                    ) : null}
                    <OuterBox onPress={togglePicker}>
                        {icon ? React.cloneElement(icon, {
                            color: '#000',
                            size: 20,
                            marginRight: horizontalScale(12)
                        }) : null}
                        {showPicker ? (
                            <RNDateTimePicker
                                value={value}
                                mode={mode}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || defaultDate;
                                    onChange(currentDate)
                                    togglePicker()
                                }}
                            />
                        ) : null}
                        <Text fontWeight={400} fontSize={18}>
                            {formatValue(value)}
                        </Text>
                    </OuterBox>
                    {(error && validations)
                        ? <Error>{validations.messages[error.type]}</Error>
                        : null}
                </RootContainer>
            )}
        />
    );
};

DateTimePicker.defaultProps = {
    mode: 'date'
}

export default DateTimePicker;
