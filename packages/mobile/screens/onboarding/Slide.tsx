import {
    Text,
    Image,
    View,
    Dimensions,
    ImageSourcePropType
} from 'react-native';
import style from './style';

type SlideProps = {
    title: string;
    image: ImageSourcePropType;
    id: number;
}

const Slide = ({ title, image } : SlideProps) => {
    return (
        <View style={style.view}>
            <Text style={style.text}>
                {title}
            </Text>
            <Image source={image} />
        </View>
    )
}

export default Slide
