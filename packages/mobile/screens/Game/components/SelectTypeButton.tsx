import React from 'react';
import { Controller } from 'react-hook-form';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Text } from '../../../components';
import styled from 'styled-components/native';
import { View } from 'react-native';

const StyledRadioButton = styled.TouchableOpacity`
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    margin-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
    border-radius: ${scaleFontSize(6)}px;
    gap: 10px;
    border: 2px solid ${props => props.isSelected
        ? props.theme.palette.info.main
        : props.theme.palette.secondary.main};
    background-color: ${props => props.isSelected
        ? props.theme.palette.info.main
        : 'transparent'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 150px;
`

const SelectTypeButton = ({ control, name, options }) => (
    <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {options.map((option, i) => (
                    <StyledRadioButton
                        key={i}
                        onPress={() => onChange(option)}
                        isSelected={value === option}
                    >
                        <Text
                            fontSize={20}
                            align='center'
                            fontWeight={600}
                            color='text'
                            variant={value == option ? 'white' : 'primary'}
                        >
                            {option}
                        </Text>
                    </StyledRadioButton>
                ))}
            </View>
        )}
    />
);

export default SelectTypeButton;
