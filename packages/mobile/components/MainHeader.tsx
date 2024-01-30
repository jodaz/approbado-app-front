import * as React from 'react'
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import { Dimensions, View } from 'react-native'
import { horizontalScale } from '../styles/scaling';
import Text from './Text';

const { width: screenWidth } = Dimensions.get('screen')

const MainHeader = ({ children, useChildren }) => {
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
                {useChildren ? (
                    <Text>
                        {children}
                    </Text>
                ) : <Logotipo />}
            </View>
        </View>
    )
}

export default MainHeader
