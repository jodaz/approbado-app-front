import * as React from 'react'
import { ImageProps, StyleProp, TextInputProps, PressableProps } from 'react-native';

type ColorThemeType = 'primary' | 'secondary' | 'error';

type VariantType = 'outlined' | 'text' | 'contained';

type TextAlignType = 'right' | 'left' | 'center';

type FlexboxAlignType = 'center' | 'start' | 'end' | 'unset' | 'space-between';

export interface IComp {
    children: React.ReactNode
}

export interface IButtonProps extends PressableProps {
    onPress?: () => void;
    bgColor: ColorThemeType;
    variant?: VariantType;
    fontWeight?: number;
    fullWidth?: boolean;
    color: ColorThemeType;
    isLoading?: boolean;
}

export interface ITextProps extends IComp {
    color?: ColorThemeType;
    fontWeight?: number;
    fontSize?: number;
    style?: StyleProp;
    align?: TextAlignType;
    transform?: 'lowercase' | 'uppercase' | 'unset';
}

export interface ILinkProps extends ITextProps {
    to: string;
}

export interface ITextInputProps extends TextInputProps {
    control: any;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    validations?: any;
    icon?: React.ReactNode,
    secureTextEntry?: boolean;
}

export interface ITitleBarProps {
    title: string;
}

export interface IRowProps extends IComp {
    size?: number;
    align?: FlexboxAlignType;
    justify?: FlexboxAlignType;
    direction?: 'column' | 'row'
}

export interface ICheckboxProps {
    control: any;
    name: string;
    label: string;
}
