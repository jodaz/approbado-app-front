import Switch from './Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const SwitchInput = () => {
    return (
        <FormControlLabel
            control={<Switch />}
            label="Secondary"
        />
    )
}

export default SwitchInput
