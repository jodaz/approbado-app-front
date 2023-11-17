import React from "react";
import { Text } from "react-native";
import { Check } from "lucide-react-native";
import { closeToast, useToast } from '@approbado/lib/contexts/ToastContext'
import styled from "styled-components/native";

const colors = {
    success: 'green',
    error: 'red',
    info: 'blue'
}

const ToastDiv = styled.View`
    top: 70px;
    width: 100%;
    position: absolute;
    flex-direction: row;
    justify-content: center;
`

const InnerContainer = styled.View`
    background-color: #00B94A;
    width: 90%;
    border-radius: 5px;
    padding: 20px;
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
        <ToastDiv color={colors.success}>
            <InnerContainer color={colors.success}>
                <Check color='#fff' size={24} />
                <Text style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontSize: 16,
                }}>{message}</Text>
            </InnerContainer>
        </ToastDiv>
    )
}

export default Toast;