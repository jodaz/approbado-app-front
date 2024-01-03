import React from 'react';
import { Post } from '@approbado/lib/types/models'
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { Trash2 } from 'lucide-react-native';
import { deleteComment } from '@approbado/lib/services/comments.services.ts'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext'
import styled from 'styled-components/native';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import { Button, Row, Text } from '../../../components';
import { useForm } from 'react-hook-form';

interface IDeleteButtonProps {
    comment: Post;
}

const { height, width } = Dimensions.get('screen')

const IconButton = styled.Pressable`
    padding-vertical: ${props => verticalScale(props.theme.space[1])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

const Content = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    flex-direction: column;
    height: fit-content;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-horizontal: ${horizontalScale(23)}px;
    padding-vertical: ${verticalScale(23)}px;
    bottom: 0;
    border-width: 1px;
    border-color: ${props => props.theme.palette.secondary.light};
    elevation: 5;
`

const DeleteComment = ({ comment } : IDeleteButtonProps ) : JSX.Element => {
    const { dispatch } = useToast()
    const { handleSubmit, formState } = useForm();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDeleteModal = () => setIsOpen(!isOpen);

    const handleDelete = async () => {
        const { success } = await deleteComment(comment.id)

        if (success) {
            await openToast(
                dispatch,
                'success',
                'Comentario eliminado.'
            )
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    return (
        <>
            <IconButton onPress={toggleDeleteModal}>
                <Trash2 color={'#6D6D6D'} />
            </IconButton>
            <Modal
                animationType="fade"
                transparent
                visible={isOpen}
                onRequestClose={toggleDeleteModal}
            >
                <TouchableOpacity style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    height: height,
                    width: width
                }} onPress={toggleDeleteModal}/>
                <Content>
                    <Row size={2}>
                        <Text fontWeight={400}>
                            ¿Está seguro que desea eliminar este post?
                        </Text>
                    </Row>
                    <Row size={1} direction="row" justify='space-between'>
                        <Button
                            variant='contained'
                            onPress={handleSubmit(handleDelete)}
                            disabled={!formState.isValid || formState.isSubmitting}
                            isLoading={formState.isSubmitting}
                        >
                            Eliminar
                        </Button>
                        <Button
                            variant='outlined'
                            onPress={toggleDeleteModal}
                            disabled={!formState.isValid || formState.isSubmitting}
                        >
                            Cancelar
                        </Button>
                    </Row>
                </Content>
            </Modal>
        </>
    )
}

export default DeleteComment;
