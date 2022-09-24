import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'

const OPTIONS = [
    { id: '1', name: 'Respuesta correcta' },
    { id: '0', name: 'Respuesta incorrecta' }
]

const SelectAclaratoryInput = ({ disabled }) => (
    <InputContainer
        sm='12'
        md='6'
        disabled={disabled}
        label='Mostrar cuando'
    >
        <SelectInput
            name='explanation_type'
            placeholder='Ingrese el texto de la aclaratoria'
            options={OPTIONS}
        />
    </InputContainer>
)

export default SelectAclaratoryInput
