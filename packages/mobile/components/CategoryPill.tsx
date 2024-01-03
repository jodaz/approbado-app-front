import React from 'react';
import styled from 'styled-components/native';
import { Category } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../styles/scaling';

const StyledText = styled.Text`
    padding-vertical: ${verticalScale(6)}px;
    padding-horizontal: ${horizontalScale(10)}px;
    background-color: #BFD8F4;
    color: ${props => props.theme.palette.info.main};
    width: fit-content;
    max-width: fit-content;
    border-radius: ${scaleFontSize(6)}px;
    fontWeight: 600;
    margin-right: ${props => horizontalScale(props.theme.space[1])}px;
`

const CategoryPill = ({ item } : Category ) : JSX.Element => (
    <StyledText key={item.id}>
        {item.name}
    </StyledText>
)

export default CategoryPill;
