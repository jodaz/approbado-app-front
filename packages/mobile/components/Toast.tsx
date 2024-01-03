import React from "react";
import { Check, XCircle } from "lucide-react-native";
import { closeToast, useToast } from '@approbado/lib/contexts/ToastContext'
import {
    horizontalScale,
    scaleFontSize,
    verticalScale
} from "../styles/scaling";
import Text from "./Text";
import styled from "styled-components/native";

const colors = {
    success: '#00B94A',
    error: '#E02340',
    info: '#2280ED'
}

const ToastDiv = styled.View`
    bottom: ${verticalScale(50)}px;
    width: 100%;
    position: absolute;
    flex-direction: row;
    justify-content: center;
`

const InnerContainer = styled.View`
    background-color: ${props => props.color};
    width: 90%;
    border-radius: ${scaleFontSize(6)}px;
    padding-vertical: ${verticalScale(16)}px;
    padding-horizontal: ${horizontalScale(16)}px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    shadow-color: #003049;
    shadow-opacity: 0.4;
    shadow-radius: 2px;
    shadow-offset: 0px 1px;
    elevation: 2
`

const Toast = () => {
    const { state: { isOpen, message, color }, dispatch } = useToast()

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                closeToast(dispatch)
            }, 3000);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return(
        <ToastDiv>
            <InnerContainer color={colors[color]}>
                {(color == 'success')
                    ? <Check color='#fff' size={scaleFontSize(32)} />
                    : <XCircle color='#fff' size={scaleFontSize(32)} />
                }
                <Text style={{
                    color: '#FFF',
                    marginLeft: horizontalScale(10)
                }}>
                    {message}
                </Text>
            </InnerContainer>
        </ToastDiv>
    )
}

export default Toast;
