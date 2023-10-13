import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    text: {
        fontWeight: '600',
        fontSize: 20,
        color: '#101521',
        textAlign: 'center',
        width: width * .9
    },
    view: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '75%',
        width: width,
        resizeMode: 'contain'
    },
    buttonInnerText: {
        fontWeight: '600',
    },
    secondaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#A6A6A6',
        backgroundColor: '#fff',
        color: '#A6A6A6'
    },
    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 6,
        backgroundColor: '#F6FA00',
        color: '#000'
    },
    indicators: {
        width: 36,
        height: 8,
        borderRadius: 2,
        backgroundColor: '#A6A6A6',
        marginEnd: 10
    },
    textButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 48,
        color: '#6D6D6D'
    },
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: height * .75
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height
    },
    lightText: {
        color: '#6D6D6D'
    }
});

export default style;
