import * as React from 'react'
import { Modal, TouchableOpacity, Dimensions, View } from 'react-native';
import { IComp } from '../../../types';
import { Row, Text } from '../../../components';
import styled from 'styled-components/native';
import { horizontalScale, scaleFontSize } from '../../../styles/scaling';

const { height, width } = Dimensions.get('screen')

const Content = styled.View`
    flex-direction: column;
    height: fit-content;
    background-color: white;
    border-radius: ${scaleFontSize(20)}px;
    padding: 23px;
    border-width: 1px;
    width: ${horizontalScale(width * .7)}px;
    border-color: ${props => props.theme.palette.secondary.light};
    elevation: 5;
`

interface ITriviaModeProps extends IComp {
    isOpen: boolean;
    handleClose: () => void;
}

const TriviaMode = ({ isOpen, handleClose, children } : ITriviaModeProps) => (
    <Modal
        animationType="fade"
        transparent
        visible={isOpen}
        onRequestClose={handleClose}
    >
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            width: width,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <TouchableOpacity style={{
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                flex: 1,
                height: height,
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
            }} onPress={handleClose}>
                <Content>
                    <Text align='center'>
                        Modo de la trivia
                    </Text>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            return (
                                <Row size={1} justify='start' direction="row">
                                    {React.cloneElement(child)}
                                </Row>
                            )
                        }

                        return null;
                    })}
                </Content>
            </TouchableOpacity>
        </View>
    </Modal>
)

export default TriviaMode
