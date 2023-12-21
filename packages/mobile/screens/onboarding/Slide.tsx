import {
    Image,
    Dimensions,
    ImageSourcePropType,
} from 'react-native';
import {
    Button,
    Text
} from '../../components'
import ButtonGroup from '../../components/ButtonGroup';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`

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
                        bgvariant='secondary'
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
