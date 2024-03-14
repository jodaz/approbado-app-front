import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { horizontalScale } from '../styles/scaling';
import Text from './Text';

const { width: screenWidth } = Dimensions.get('screen')

const AppHeaderWithTitle = ({ children }) => {
    const [width, setWidth] = React.useState(0);
    const ref = React.useRef()

    return (
        <View style={{
            width: horizontalScale((screenWidth + (width / 2)) / 2),
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <View ref={ref} onLayout={event => {
                setWidth(event.nativeEvent?.layout?.width);
            }}>
                <Text>
                    {children}
                </Text>
            </View>
        </View>
    )
}

export default AppHeaderWithTitle
