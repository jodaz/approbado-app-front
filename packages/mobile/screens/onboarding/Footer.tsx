import {
    View,
    Dimensions
} from 'react-native';
import style from './style';
import slides from './slides';

const { height } = Dimensions.get('window');

type FooterProps = {
    current: number
}

const Footer = ({ current } : FooterProps) => {
    return (
        <View
            style={{
                height: height * 0.1,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
            }}>
            {/* Indicator container */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                {/* Render indicator */}
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            style.indicators,
                            current == index && {
                              backgroundColor: '#2280ED',
                            }
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

export default Footer
