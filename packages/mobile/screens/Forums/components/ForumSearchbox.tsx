import * as React from 'react'
import { Row, TextInput } from '../../../components';
import { Search } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import { TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

const ForumSearchbox = () => {
    const [open, setOpen] = React.useState(false);
    const { control, watch } = useForm()
    const searchboxValue = watch('searchbox')

    const toggleSearch = () => setOpen(!open);

    if (!open) {
        return (
            <Row size={2} align='center' direction='row' justify='space-between'>
                {!open ? <Logotipo /> : null}
                <TouchableOpacity onPress={toggleSearch}>
                    <Search size={24} color='#000' />
                </TouchableOpacity>
            </Row>
        )
    }

    return (
        <Row size={2} align='center' direction='row' justify='space-between'>
            <TextInput
                control={control}
                name='searchbox'
                icon={<Search size={24} color='#000' />}
            />
        </Row>
    );
}

export default ForumSearchbox
