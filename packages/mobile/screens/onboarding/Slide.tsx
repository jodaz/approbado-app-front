import {
    Text,
    Image,
    View,
    ImageSourcePropType,
    Pressable
} from 'react-native';
import style from './style';

type SlideProps = {
    title: string;
    image: ImageSourcePropType;
    id: number;
    buttons: any;
}

const Slide = ({ title, image, buttons } : SlideProps) => {
    return (
        <View style={style.view}>
            <Text style={style.text}>
                {title}
            </Text>
            <Image source={image} />
            <View style={style.buttonsContainer}>
                {buttons.next && (
                    <Pressable style={buttons.next.color == 'secondary' ? style.secondaryButton : style.primaryButton}>
                        <Text style={{ fontWeight: '600' }}>{buttons.next.label}</Text>
                    </Pressable>
                )}
                {buttons.discard && (
                    <Pressable style={style.textButton}>
                        <Text>Omitir</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}

export default Slide
