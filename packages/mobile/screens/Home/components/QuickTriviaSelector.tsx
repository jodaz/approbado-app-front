import * as React from 'react'
import styled from "styled-components/native";
import {
    horizontalScale,
    scaleFontSize,
    verticalScale
} from '../../../styles/scaling';
import { Text } from '../../../components';
import { Controller } from 'react-hook-form';

const StyledButton = styled.TouchableOpacity`
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[4])}px;
    margin-top: ${props => verticalScale(props.theme.space[1])}px;
    border-radius: ${scaleFontSize(6)}px;
    gap: 10px;
    background-color: ${props => props.isSelected
        ? props.theme.palette.info.main
        : 'transparent'};
    border: 2px solid ${props => props.isSelected
        ? props.theme.palette.info.main
        : props.theme.palette.primary.light};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const Container = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`

const StyledText = styled(Text)`
    color: ${props => props.isSelected ?
        '#fff'
        : '#A6A6A6'}
`

const QuickTriviaSelector = ({ control, name, options }) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
            <Container>
                {options.map((option, i) => (
                    <StyledButton
                        key={i}
                        onPress={() => onChange(option.value)}
                        isSelected={value === option.value}
                    >
                        <StyledText
                            fontSize={22}
                            isSelected={value === option.value}
                        >
                            {option.label}
                        </StyledText>
                        {React.cloneElement(option.icon, {
                            color: (value === option.value) ? '#fff' : '#A6A6A6',
                            size: 24
                        })}
                    </StyledButton>
                ))}
            </Container>
        )}
    />
)

export default QuickTriviaSelector
