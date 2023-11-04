import * as React from 'react'
import { Image as NativeImage, ImageProps } from 'react-native';
import CONFIG_NAMES from '@approbado/lib/env';

const Image = ({ source, ...restProps }: ImageProps) : JSX.Element => (
    <NativeImage
        source={{ uri: `${CONFIG_NAMES.SOURCE}/${source}` }}
        {...restProps}
    />
)

Image.defaultProps = {
    width: 50,
    height: 50
}

export default Image
