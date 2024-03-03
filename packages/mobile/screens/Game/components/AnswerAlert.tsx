import * as React from 'react'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Modal, Dimensions, View } from 'react-native';
import AnswerSuccess from '@approbado/lib/illustrations/AnswerSuccess.svg'
import AnswerIncorrect from '@approbado/lib/illustrations/AnswerIncorrect.svg'

const { height, width } = Dimensions.get('screen')

const AnswerAlert = ({ status }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleModal = () => setIsVisible(!isVisible)

    React.useEffect(() => {
        if (status != null) {
            toggleModal()

            setTimeout(() => {
                setIsVisible(false)
            }, 1000);
        }
    }, [status]);

    return (
        <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            onRequestClose={() => {}}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: height,
                width: width,
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
            }}>
                <View style={{
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {status ? <AnswerSuccess /> : <AnswerIncorrect />}
                </View>
            </View>
        </Modal>
    );
}

export default AnswerAlert
