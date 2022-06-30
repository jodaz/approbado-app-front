import { useFormState } from 'react-final-form'
import TextInput from '@approbado/lib/components/TextInput';
import InputContainer from '@approbado/lib/components/InputContainer'

const ChatNameInput = ({ submitting }) => {
    const { values } = useFormState();

    if (!values.users_ids) return null;
    if (!(values.users_ids.length > 1)) return null;

    return (
        <InputContainer loading={submitting} label='Nombre para el grupo' md='12'>
            <TextInput name='name' fullWidth />
        </InputContainer>
    )
}

export default ChatNameInput;
