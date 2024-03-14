import * as React from 'react';
import { listPlans } from '@approbado/lib/services/plans.services';
import { useMediaQuery } from '@material-ui/core'
import MembershipCard from './MembershipCard'
import ListContainer from '../components/ListContainer'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import CreateButton from '../components/CreateButton'
import GridList from '@approbado/lib/components/GridList'

const PlansList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState({})
    const [plans, setPlans] = React.useState([])

    const fetchPlans = async () => {
        const { success, data } = await listPlans({
            filter: filter
        })

        if (success) {
            setPlans(data)
        }
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
                    data={plans}
                    component={<MembershipCard />}
                />
            }
        />
    );
}

export default PlansList;
