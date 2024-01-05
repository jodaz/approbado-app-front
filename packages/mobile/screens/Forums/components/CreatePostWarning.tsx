import * as React from 'react'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Modal, TouchableOpacity, Dimensions, View, Linking } from 'react-native';
import { Row, Text, Button, FloatingButton } from '../../../components';
import styled from 'styled-components/native';
import { Plus, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';

const { height, width } = Dimensions.get('screen')

const Content = styled.View`
    flex-direction: column;
    height: fit-content;
    background-color: white;
    border-radius: ${props => scaleFontSize(props.theme.space[1])}px;
    border-width: 1px;
    width: ${horizontalScale(width * .8)}px;
    border-color: ${props => props.theme.palette.secondary.light};
    elevation: 5;
`

const CreatePostWarning = () => {
    const navigation = useNavigation()
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => setIsOpen(!isOpen)

    const onPress = () => {
        navigation.navigate(Routes.CreateForum)
        toggleModal()
    };

    return (
        <>
            <FloatingButton
                icon={<Plus />}
                onPress={toggleModal}
            />
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
                            <Row size={1} justify='flex-end' direction='row' style={{
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                borderColor: '#000',
                                paddingHorizontal: horizontalScale(8),
                                paddingVertical: verticalScale(8)
                            }}>
                                <TouchableOpacity>
                                    <X size={24} color='#000' />
                                </TouchableOpacity>
                            </Row>
                            <View style={{
                                paddingHorizontal: horizontalScale(16)
                            }}>
                                <Row size={2}>
                                    <Text fontSize={18} align='center' fontSize={24}>
                                        ¡Importante!
                                    </Text>
                                </Row>
                                <Row>
                                    <Text fontSize={18} fontWeight={400} align='center'>
                                        Este foro es un espacio informativo, cualquier usuario puede consultar a la comunidad de Approbado.
                                        No se permiten publicaciones de discriminación, odio, aborrecimiento, falta de respeto y/o burla hacia algún usuario y no se permitirán publicaciones que no sean sobre temas académicos legales; de lo contrario cualquier usuario y/o administrador tiene la opción de reportarlo.
                                    </Text>
                                </Row>
                                <Row>
                                    <Text fontSize={18} fontWeight={400} align='center'>
                                        Para más infomación sobre advertencia y sanciones,
                                        {' '}
                                        <Text
                                            color="info"
                                            variant="main"
                                            onPress={() => Linking.openURL('https://www.lipsum.com/')}
                                            style={{
                                                textDecorationLine: 'underline'
                                            }}
                                        >
                                            click aquí
                                        </Text>
                                    </Text>
                                </Row>
                                <Row size={4}>
                                    <Button onPress={onPress}>
                                        Comenzar
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

export default CreatePostWarning
