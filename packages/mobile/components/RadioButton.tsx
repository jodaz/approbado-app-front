import React from 'react';
import Text from './Text';
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';
import { horizontalScale, scaleFontSize, verticalScale } from '../styles/scaling';

const StyledRadioButton = styled.TouchableOpacity`
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    border-radius: ${scaleFontSize(6)}px;
    gap: 10px;
    border: 2px solid ${props => props.isSelected
        ? props.theme.palette.info.main
        : props.theme.palette.secondary.main};
    display: flex;
    flex-direction: row;
    align-items: center;
`

const OuterRadioView = styled.View`
    height: 24px;
    width: 24px;
    border-radius: 12px;
    border: 2px solid ${props => props.isSelected
        ? props.theme.palette.info.main
        : props.theme.palette.secondary.main};
    align-items: center;
    justify-content: center;
`

const InnerRadioView = styled.View`
    height: ${verticalScale(12)}px;
    width: ${horizontalScale(12)}px;
    border-radius: 6px;
    background: ${props => props.theme.palette.info.main};
`

const RadioButton = ({ control, name, options, disabled }) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
            <>
                {options.map((option, i) => (
                    <StyledRadioButton
                        key={i}
                        onPress={() => onChange(option)}
                        isSelected={value === option}
                        disabled={disabled}
                    >
                        <OuterRadioView isSelected={value === option}>
                            {value === option ? <InnerRadioView /> : null}
                        </OuterRadioView>
                        <Text fontSize={17} fontWeight={400}>
                            {option}
                        </Text>
                    </StyledRadioButton>
                ))}
            </>
        )}
    />
);

export default RadioButton;
