import * as React from 'react'
import { Row, TextInput } from '../../../components';
import { Search } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import { TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const ForumSearchbox = () => {
    const [open, setOpen] = React.useState(false);
    const { control, watch } = useForm()
    const searchboxValue = watch('searchbox')
    const ref = React.useRef()

    const toggleSearch = () => setOpen(!open);

    return (
        <View style={{
            paddingTop: verticalScale(30),
            paddingHorizontal: horizontalScale(10)
        }}>
            <View ref={ref} style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                {!open ? <Logotipo /> : null}
                <TouchableOpacity onPress={toggleSearch}>
                    <Search size={24} color='#000' />
                </TouchableOpacity>
            </View>
        </View>
    )

    if (!open) {
        return (
            <Row size={4} align='center' direction='row' justify='space-between'>
                {!open ? <Logotipo /> : null}
                <TouchableOpacity onPress={toggleSearch}>
                    <Search size={24} color='#000' />
                </TouchableOpacity>
            </Row>
        )
    }

    return (
        <Row size={4} align='center' direction='row' justify='space-between'>
            <TextInput
                control={control}
                name='searchbox'
                icon={<Search size={24} color='#000' />}
            />
        </Row>
    );
}

export default ForumSearchbox
