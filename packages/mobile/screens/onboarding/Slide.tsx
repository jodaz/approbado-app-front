import {
    Text,
    Image,
    View,
    ImageSourcePropType,
} from 'react-native';
import style from './style';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

type SlideProps = {
    title: string;
    image: ImageSourcePropType;
    id: number;
    buttons: any;
    skip: () => void;
    next: () => void;
}

const Slide = ({ title, image, buttons, skip, next } : SlideProps) => {
    return (
        <View style={style.view}>
            <Text style={style.text}>
                {title}
            </Text>
            <Image source={image} />
            <ButtonGroup>
                {buttons.next && (
                    <Button 
                        onPress={next}
                        bgColor={buttons.next.color}
                        variant={buttons.next.variant}
                    >
                        {buttons.next.label}
                    </Button>
                )}
                {buttons.discard && (
                    <Button 
                        onPress={skip}
                        bgColor='secondary'
                        variant='text'
                        fontWeight={400}
                    >
                        Omitir
                    </Button>
                )}
            </ButtonGroup>
        </View>
    )
}

export default Slide
