import * as React from 'react'
import { StyleProp, TextInputProps, PressableProps } from 'react-native';

type ColorThemeType = 'primary' | 'secondary' | 'error' | 'text' | 'info';

type VariantType = 'outlined' | 'text' | 'contained';

type VariantColorType = 'primary' | 'secondary' | 'main';

type TextAlignType = 'right' | 'left' | 'center';

type FlexboxAlignType = 'center' | 'start' | 'end' | 'unset' | 'space-between';

type TextDecorationType = 'none' | 'underline';

export interface IComp {
    children: React.ReactNode
}

export interface IButtonProps extends PressableProps {
    onPress?: () => void;
    bgColor: ColorThemeType;
    variant?: VariantType;
    textVariant?: string;
    textColor?: string;
    fontWeight?: number;
    fullWidth?: boolean;
    color: ColorThemeType;
    icon?: React.ReactNode;
    isLoading?: boolean;
}

export interface ITextProps extends IComp {
    color?: ColorThemeType;
    fontWeight?: number;
    fontSize?: number;
    style?: StyleProp;
    align?: TextAlignType;
    variant?: VariantColorType;
    decoration?: TextDecorationType;
    onPress?: () => void;
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
    label?: string;
}

export interface ITitleBarProps {
    component: any;
}

export interface IRowProps extends IComp {
    size?: number;
    align?: FlexboxAlignType;
    justify?: FlexboxAlignType;
    direction?: 'column' | 'row';
    style?: any;
}

export interface ICheckboxProps {
    control: any;
    name: string;
    label: string;
}

export interface ISelectProps {
    control: any;
    name: string;
    options: any;
    multiple?: boolean;
    label?: string;
    labelField?: string;
    valueField?: string;
    placeholder?: string;
    validations?: any;
    defaultValue?: string;
}
