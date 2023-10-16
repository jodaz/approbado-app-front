import * as React from 'react'
import { StyleProp } from 'react-native';

type ColorThemeType = 'primary' | 'secondary';

type VariantType = 'outlined' | 'text' | 'contained'

interface IComp {
    children: React.ReactNode
}

interface IButtonProps extends IComp {
    onPress?: () => void;
    bgColor: ColorThemeType;
    variant?: VariantType;
    fontWeight?: number;
}

interface ITextProps extends IComp {
    onPress?: () => void;
    color: ColorThemeType;
    variant?: VariantType;
    fontWeight?: number;
    fontSize?: number;
    style?: StyleProp;
}
