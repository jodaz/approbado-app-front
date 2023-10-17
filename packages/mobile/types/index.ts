import * as React from 'react'
import { StyleProp } from 'react-native';

type ColorThemeType = 'primary' | 'secondary';

type VariantType = 'outlined' | 'text' | 'contained'

type TextAlignType = 'right' | 'left' | 'center'

export interface IComp {
    children: React.ReactNode
}

export interface IButtonProps extends IComp {
    onPress?: () => void;
    bgColor: ColorThemeType;
    variant?: VariantType;
    fontWeight?: number;
    fullWidth?: boolean;
}

export interface ITextProps extends IComp {
    color?: ColorThemeType;
    fontWeight?: number;
    fontSize?: number;
    style?: StyleProp;
    align?: TextAlignType;
}

export interface ILinkProps extends ITextProps {
    to: string;
}

export interface ITextInputProps {
    control: any;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    validations?: any;
    secureTextEntry?: boolean;
}
