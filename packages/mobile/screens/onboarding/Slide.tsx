import {
    Image,
    ImageSourcePropType,
} from 'react-native';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Container from '../../components/Container';

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
        <Container>
            <Text align='center'>
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
        </Container>
    )
}

export default Slide
