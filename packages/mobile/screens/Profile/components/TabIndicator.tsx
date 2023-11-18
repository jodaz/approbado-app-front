import React from 'react'
import {
    View,
    Dimensions
} from 'react-native';
import { Text } from '../../../components';
import styled from 'styled-components/native';
import profileSliders from './profileSliders';

const { height } = Dimensions.get('window');

type TabIndicatorProps = {
    current: number;
    onTouch: () => void;
    index: number;
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
    padding-left: ${props => props.theme.space[2]};
    padding-right: ${props => props.theme.space[2]};
`

const TabIndicator = ({ current } : TabIndicatorProps) => (
        <View style={{
            height: height * 0.1,
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
        }}>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
            }}>
                {/* Render indicator */}
                {profileSliders.map((slider, index) => (
                    <Indicator
                        key={index}
                        style={[
                            current == index && {
                                borderBottomColor: '#2280ED',
                                borderBottomWidth: 4
                            }
                        ]}
                    >
                            <TabName isActive={current == index}>
                            {slider.tabName}
                        </TabName>
                    </Indicator>
                ))}
        </View>
    </View>
)

export default TabIndicator
