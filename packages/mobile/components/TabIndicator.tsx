import React from 'react'
import Text from './Text';
import styled from 'styled-components/native';
import { IComp } from '../types';
import { horizontalScale, verticalScale } from '../styles/scaling';

interface ITabIndicatorProps extends IComp {
    active: boolean;
    onPress: () => void;
    onLongPress: () => void;
}

const Indicator = styled.TouchableOpacity`
    borderRadius: 2px;
    marginEnd: ${horizontalScale(10)}px;
    padding-bottom: ${verticalScale(5)}px;
`

const TabName = styled(Text)`
    color: ${props => props.isActive
        ? props.theme.palette.info.main
        : props.theme.palette.text.secondary
    };
    height: ${verticalScale(25)}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
`

const TabIndicator = ({ children, active, ...restProps } : ITabIndicatorProps) => (
    <Indicator
        style={[
            active && {
                borderBottomColor: '#2280ED',
                borderBottomWidth: verticalScale(4)
            }
        ]}
        {...restProps}
    >
        <TabName fontSize={22} isActive={active}>
            {children}
        </TabName>
    </Indicator>
)

export default TabIndicator
