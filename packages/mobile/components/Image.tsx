import * as React from 'react'
import { Image as NativeImage, ImageProps } from 'react-native';
import { horizontalScale, verticalScale } from '../styles/scaling';
import CONFIG_NAMES from "@approbado/lib/env"

const Image = ({
    source,
    width = 50,
    height = 50,
    style,
    ...restProps
}: ImageProps) : JSX.Element => (
    <NativeImage source={{ uri: `${CONFIG_NAMES.SOURCE}/${source}` }} style={{
        width: verticalScale(width),
        height: horizontalScale(height),
        ...style
    }} />
)

export default Image
