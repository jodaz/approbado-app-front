import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        width: width
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
});

export default style;
