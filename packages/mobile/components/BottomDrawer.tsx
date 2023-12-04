import * as React from 'react'
import { Modal, TouchableOpacity, Dimensions } from 'react-native';
import { IComp } from '../types';
import styled from 'styled-components/native';
import Row from './Row';

const { height, width } = Dimensions.get('screen')

const Content = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    flex-direction: column;
    height: fit-content;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 23px;
    bottom: 0;
    border-width: 1px;
    border-color: ${props => props.theme.palette.secondary.light};
    elevation: 5;
`

interface IBottomDrawerProps extends IComp {
    isOpen: boolean;
    handleClose: () => void;
}

const BottomDrawer = ({ isOpen, handleClose, children } : IBottomDrawerProps) => (
    <Modal
        animationType="fade"
        transparent
        visible={isOpen}
        onRequestClose={handleClose}
    >
        <TouchableOpacity style={{
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            height: height,
            width: width
        }} onPress={handleClose}/>
        <Content>
            {React.Children.map(children, (child) => (
                <Row size={1} justify='start' direction="row">
                    {React.cloneElement(child)}
                </Row>
            ))}
        </Content>
    </Modal>
)

export default BottomDrawer
