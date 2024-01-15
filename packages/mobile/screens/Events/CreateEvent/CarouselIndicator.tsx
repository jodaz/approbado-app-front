import React from 'react'
import {Text} from '../../../components';
import styled from 'styled-components/native';
import { IComp } from '../../../types';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

interface ITabIndicatorProps extends IComp {
    active: boolean;
}

const Indicator = styled.View`
    borderRadius: 100px;
    marginEnd: ${horizontalScale(10)}px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const TabName = styled(Text)`
    color: ${props => props.isActive
        ? '#fff'
        : props.theme.palette.text.secondary
    };
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
`

const CarouselIndicator = ({ children, active, ...restProps } : ITabIndicatorProps) => (
    <Indicator
        style={[
            active && {
                borderRadius: 100,
                backgroundColor: '#2280ED'
            }
        ]}
        {...restProps}
    >
        <TabName fontSize={22} isActive={active}>
            {children}
        </TabName>
    </Indicator>
)

export default CarouselIndicator
