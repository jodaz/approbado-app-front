import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core'
import Avatar from '@approbado/lib/components/Avatar';
import { Close } from '@approbado/lib/icons'

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

const SelectUsersInput = ({ submitting }) => {
    const classes = useStyles();
    const [users, setUsers] = React.useState([])

    const fetchUsers = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/users?filter[is_registered]=true')
        setUsers(data)
    }, []);

    React.useEffect(() => {
        fetchUsers();
    }, [])

    if (!Object.entries(users).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Participantes"
            md={12}
            xs={12}
        >
            <SelectInput
                name='users_ids'
                options={users}
                multiple
                property='names'
                renderOption={(option, { selected }) => (
                    <Box className={classes.userCard}>
                        <Avatar
                            source={option.picture}
                            alt='photo_profile'
                        />
                        <Box className={classes.userInfo}>
                            <Box sx={{
                                fontSize: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 600
                            }}>
                                {option.names}
                            </Box>
                            <Box sx={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#6D6D6D'
                            }}>
                                {option.email}
                            </Box>
                        </Box >
                    </Box>
                )}
                getOptionSelected={(option, value) => option.names === value.names}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.names}
                            size="small"
                            classes={{ root: classes.chip }}
                            deleteIcon={<Close />}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                inputProps={{
                    placeholder: 'Seleccione un participante'
                }}
            />
        </InputContainer>
    )
}

export default SelectUsersInput
