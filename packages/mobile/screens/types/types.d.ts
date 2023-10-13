import * as React from 'react'

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