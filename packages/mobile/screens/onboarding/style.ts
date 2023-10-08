import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    text: {
        color: 'red',
        fontWeight: '600',
        fontSize: 20,
        color: '#101521',
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
    }
});

export default style;
