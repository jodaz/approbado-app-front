import React from 'react';
import Text from './Text';
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';

const StyledRadioButton = styled.TouchableOpacity`
    padding: ${props => props.theme.space[2]};
    margin: ${props => props.theme.space[2]};
    border-radius: 6px;
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
    height: 12px;
    width: 12px;
    border-radius: 6px;
    background: ${props => props.theme.palette.info.main};
`

const RadioButton = ({ control, name, options }) => (
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
