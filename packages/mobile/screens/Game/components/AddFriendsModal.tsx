import * as React from 'react'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Modal, TouchableOpacity, Dimensions, View, Pressable } from 'react-native';
import { Row, Text, Button } from '../../../components';
import styled from 'styled-components/native';
import { X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';

const { height, width } = Dimensions.get('screen')

const Content = styled.View`
    flex-direction: column;
    height: fit-content;
    background-color: white;
    border-radius: ${props => scaleFontSize(props.theme.space[1])}px;
    border-width: 1px;
    width: ${horizontalScale(width * .7)}px;
    border-color: ${props => props.theme.palette.secondary.light};
    elevation: 5;
`

const AddFriendsModal = ({ control }) => {
    const navigation = useNavigation()
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => setIsOpen(!isOpen)

    const onSubmit = React.useCallback(async () => {
        // const { success } = await deletePost(isOpen);

        // if (success) {
        //     await openToast(
        //         dispatchToast,
        //         'success',
        //         'Su post ha sido eliminado'
        //     )
        //     onDeletePost(isOpen)
        //     toggleModal(false)
        // }
    }, [isOpen]);

    return (
        <>
            <TouchableOpacity onPress={toggleModal}>
                <Text
                    align='left'
                    color='info'
                    variant='main'
                    style={{
                        textDecorationLine: 'underline'
                    }}
                >
                    ¿Quieres agregar amigos?
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent
                visible={isOpen ? true : false}
                onRequestClose={toggleModal}
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
                    }} onPress={toggleModal}>
                        <Content>
                            <Row size={1} justify='space-between' direction='row' style={{
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                borderColor: '#000',
                                paddingHorizontal: horizontalScale(8),
                                paddingVertical: verticalScale(8)
                            }}>
                                <Text align='left'>
                                    Modo de la trivia
                                </Text>
                                <TouchableOpacity>
                                    <X size={24} color='#000' />
                                </TouchableOpacity>
                            </Row>
                            <View style={{
                                paddingHorizontal: horizontalScale(16)
                            }}>
                                <Row>
                                    <Pressable onPress={() => navigation.navigate(Routes.CreateEvent)}>
                                        <Text
                                            align='left'
                                            color='info'
                                            variant='main'
                                            style={{
                                                textDecorationLine: 'underline'
                                            }}
                                        >
                                            Agendar una trivia grupal
                                        </Text>
                                    </Pressable>
                                </Row>
                                <Row>
                                    <Button>
                                        Crear sala
                                    </Button>
                                </Row>
                                <Row>
                                    <Button variant='outlined' onPress={toggleModal}>
                                        Cancelar
                                    </Button>
                                </Row>
                            </View>
                        </Content>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

export default AddFriendsModal
