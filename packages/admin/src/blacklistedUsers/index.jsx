import * as React from 'react'
import BlacklistedUserCard from './BlacklistedUserCard'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
import GridList from '@approbado/lib/components/GridList';
import ListContainer from '../components/ListContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import { useMediaQuery } from '@material-ui/core'

const initialFilter = { in_blacklist: false };

const BlacklistedUsersList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState(initialFilter)
    const [users, setUsers] = React.useState([])

    const fetchReports = async () => {
        const res = await axios({
            method: 'GET',
            url: '/users',
            params: getQueryFromParams({ filter })
        })

        setUsers(res.data.data);
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            // setFilter({
            //     global_search: e.currentTarget.value
            // })
        } else {
            setFilter(null)
        }
    }

    React.useEffect(() => {
        fetchReports()
    }, [filter])

    return (
        <ListContainer
            actions={
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    margin: '1rem 0'
                }}>
                    <Box width={isSmall ? '100%' : '25%'}>
                        <TextField
                            onChange={handleOnChange}
                            placeholder='Buscar'
                            fullWidth
                        />
                    </Box>
                </Box>
            }
            list={
                <Box marginTop='1rem'>
                    <GridList
                        data={users}
                        component={<BlacklistedUserCard />}
                    />
                </Box>
            }
        />
    );
}

export default BlacklistedUsersList
