import React from 'react';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@approbado/lib/icons/CloseIcon'
import { Field } from 'react-final-form'

const useStyles = makeStyles(theme => ({
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    chip: {
        padding: '4px 4px 4px 8px !important',
        backgroundColor: '#EAEAEA !important',
        borderRadius: '6px',
        fontWeight: 600,
        color: theme.palette.info.dark
    }
}))

const ControllableSelectInput = props => {
    const classes = useStyles();
    const {
        meta: { touched, error, submitError, initial } = { touched, initial, error, submitError },
        input: { onChange, value, multiple, ...restInputProps },
        meta,
        options,
        property,
        inputProps,
        ...rest
    } = props;
    const [defaultValue] = React.useState((() => {
        if (multiple && value.length && options.length) {
            return value.filter(item => options.indexOf(item))
        } else if (!multiple && value && options.length) {
            return options.find(item => item.id == value);
        } else {
            return multiple ? [] : null;
        }
    })());

    const handleChange = (event, option) => (onChange(option.id))

    const handleMultipleChange = (event, option) => (onChange(option.map(items => items.id)))

    if (!options.length) return null;

    return (
        <FormControl className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth" style={{ width: '100%' }}>
            <Autocomplete
                multiple={multiple}
                {...restInputProps}
                options={options}
                getOptionLabel={option => option[property]}
                renderInput={params => (
                    <TextField
                        {...params}
                        InputProps={{ ...params.InputProps, ...inputProps }}
                    />
                )}
                renderOption={(option, { selected }) => (
                    <Box className={classes.userCard}>
                        <Box className={classes.userInfo}>
                            <Box sx={{
                                fontSize: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 600
                            }}>
                                {option[property]}
                            </Box>
                        </Box >
                    </Box>
                )}
                getOptionSelected={(option, value) => option[property] === value.name}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option[property]}
                            size="small"
                            classes={{ root: classes.chip }}
                            deleteIcon={<CloseIcon />}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                defaultValue={defaultValue}
                onChange={multiple ? handleMultipleChange : handleChange}
                {...rest}
            />
            {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText>}
        </FormControl>
    );
}

const SelectInput = props => (
    <Field {...props}>
        {props => (
            <ControllableSelectInput {...props} />
        )}
    </Field>
);

ControllableSelectInput.defaultProps = {
    property: 'name',
    options: []
}

export default SelectInput;
