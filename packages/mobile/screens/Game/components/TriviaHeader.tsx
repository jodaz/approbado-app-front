import * as React from 'react'
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import { Dimensions, View } from 'react-native'
import { horizontalScale } from '../../../styles/scaling'

const { width: screenWidth } = Dimensions.get('screen')

const TriviaHeader = () => {
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
                <Logotipo />
            </View>
        </View>
    )
}

export default TriviaHeader
