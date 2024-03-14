import * as React from 'react';
import { useMediaQuery } from '@material-ui/core'
import { listAwards } from '@approbado/lib/services/awards.services'
import AwardsCard from './AwardsCard'
import ListContainer from '../components/ListContainer'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import CreateButton from '../components/CreateButton'
import GridList from '@approbado/lib/components/GridList';

const AwardsList = ({ record }) => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const initialValues = { trivia_id: record.id }
    const [filter, setFilter] = React.useState(initialValues)
    const [awards, setAwards] = React.useState([])

    const fetchAwards = async () => {
        const { success, data } = await listAwards({
            filter: filter
        })

        if (success) {
            setAwards(data)
        }
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            console.log(e.currentTarget.value)
            // setFilter(prevState => ({ ...prevState, global_search: e.currentTarget.value }))
        } else {
            setFilter(initialValues)
        }
    }

    React.useEffect(() => {
        fetchAwards()
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
                        to={`/trivias/${record.id}/awards/create`}
                        resource='/awards'
                        label='Crear'
                    />
                </Box>
            }
            list={
                <GridList
                    data={awards}
                    component={<AwardsCard />}
                />
            }
        />
    );
}

export default AwardsList;
