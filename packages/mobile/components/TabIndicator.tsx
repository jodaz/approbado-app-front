import React from 'react'
import Text from './Text';
import styled from 'styled-components/native';
import { IComp } from '../types';

interface ITabIndicatorProps extends IComp {
    active: boolean;
    onPress: () => void;
    onLongPress: () => void;
}

const Indicator = styled.TouchableOpacity`
    borderRadius: 2px;
    marginEnd: 10px;
    padding-bottom: 10px;
`

const TabName = styled(Text)`
    color: ${props => props.isActive
        ? props.theme.palette.info.main
        : props.theme.palette.text.secondary
    };
    height: 20px;
    padding-left: ${props => props.theme.space[2]};
    padding-right: ${props => props.theme.space[2]};
`

const TabIndicator = ({ children, active, ...restProps } : ITabIndicatorProps) => (
    <Indicator
        style={[
            active && {
                borderBottomColor: '#2280ED',
                borderBottomWidth: 4
            }
        ]}
        {...restProps}
    >
            <TabName isActive={active}>
            {children}
        </TabName>
    </Indicator>
)

export default TabIndicator
