import * as React from 'react'
import { Close } from '@approbado/lib/icons'
import { listPlans } from '@approbado/lib/services/plans.services'
import {
    Box,
    makeStyles,
    Chip,
    TextField
} from '@material-ui/core'
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'

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

const SelectPlansInput = ({ submitting }) => {
    const classes = useStyles();
    const [options, setOptions] = React.useState([])

    const fetchPlans = async () => {
        const { success, data } = await listPlans()

        if (success) {
            setOptions(data)
        }
    }

    React.useEffect(() => {
        fetchPlans();
    }, [])

    if (!options.length) return null;

    return (
        <InputContainer disabled={submitting} label="Planes" md={6} xs={12}>
            <SelectInput
                name='plans_ids'
                options={options}
                multiple
                property='name'
                renderOption={(option, { selected }) => (
                    <Box className={classes.userCard}>
                        <Box className={classes.userInfo}>
                            <Box sx={{
                                fontSize: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 600
                            }}>
                                {option.name}
                            </Box>
                        </Box >
                    </Box>
                )}
                getOptionSelected={(option, value) => option.name === value.name}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.name}
                            size="small"
                            classes={{ root: classes.chip }}
                            deleteIcon={<Close />}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                    />
                )}
            />
        </InputContainer>
    )
}

export default SelectPlansInput
