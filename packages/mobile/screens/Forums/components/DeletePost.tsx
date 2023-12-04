import * as React from 'react'
import { deletePost } from '@approbado/lib/services/forums.services.ts';
import { Modal, TouchableOpacity, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Row, Container, Text, Button } from '../../../components';
import styled from 'styled-components/native';

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

const DeletePost = ({ isOpen, toggleModal, onDeletePost }) => {
    const { handleSubmit, formState } = useForm();
    const { dispatch: dispatchToast } = useToast()

    const onSubmit = React.useCallback(async () => {
        const { success } = await deletePost(isOpen);

        if (success) {
            await openToast(
                dispatchToast,
                'success',
                'Su post ha sido eliminado'
            )
            onDeletePost(isOpen)
            toggleModal(false)
        }
    }, [isOpen]);

    console.log(isOpen);

    return (
        <Modal
            animationType="fade"
            transparent
            visible={isOpen ? true : false}
            onRequestClose={() => toggleModal(false)}
        >
            <TouchableOpacity style={{
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                height: height,
                width: width
            }} onPress={() => toggleModal(false)}/>
            <Content>
                <Row size={4}>
                    <Text fontSize={16} fontWeight={400}>
                        ¿Está seguro que desea eliminar este post?
                    </Text>
                </Row>
                <Row size={1} direction="row" justify='space-between'>
                    <Button
                        variant='contained'
                        onPress={handleSubmit(onSubmit)}
                        disabled={!formState.isValid || formState.isSubmitting}
                        isLoading={formState.isSubmitting}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant='outlined'
                        onPress={() => toggleModal(false)}
                        disabled={!formState.isValid || formState.isSubmitting}
                    >
                        Cancelar
                    </Button>
                </Row>
            </Content>
        </Modal>
    );
}

export default DeletePost
