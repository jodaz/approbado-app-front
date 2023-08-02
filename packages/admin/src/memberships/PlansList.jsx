import * as React from 'react';
import MembershipCard from './MembershipCard'
import ListContainer from '../components/ListContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { useMediaQuery } from '@material-ui/core'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
import CreateButton from '../components/CreateButton'
import GridList from '@approbado/lib/components/GridList'

const PlansList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState({})
    const [files, setFiles] = React.useState([])

    const fetchPlans = async () => {
        const res = await axios({
            method: 'GET',
            url: 'memberships/plans',
            params: getQueryFromParams({ filter })
        })

        setFiles(res.data.data);
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setFilter({ name: e.currentTarget.value })
        } else {
            setFilter({})
        }
    }

    React.useEffect(() => {
        fetchPlans()
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
                    <CreateButton
                        to="/memberships/plans/create"
                        label='Crear'
                    />
                </Box>
            }
            list={
                <GridList
                    data={files}
                    component={<MembershipCard />}
                />
            }
        />
    );
}

export default PlansList;
