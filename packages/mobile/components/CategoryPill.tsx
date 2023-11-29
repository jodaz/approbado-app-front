import React from 'react';
import styled from 'styled-components/native';
import { Category } from '@approbado/lib/types/models'

const StyledText = styled.Text`
    padding: 6px 10px;
    background-color: #BFD8F4;
    color: ${props => props.theme.palette.info.main};
    width: fit-content;
    max-width: fit-content;
    border-radius: 6px;
    fontWeight: 600;
    margin-right: ${props => props.theme.space[1]};
`

const CategoryPill = ({ item } : Category ) : JSX.Element => (
    <StyledText key={item.id}>
        {item.name}
    </StyledText>
)

export default CategoryPill;
