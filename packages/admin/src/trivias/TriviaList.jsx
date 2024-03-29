import * as React from 'react'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { useMediaQuery } from '@material-ui/core'
import TriviaCard from './TriviaCard'
import ListContainer from '../components/ListContainer'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import CreateButton from '../components/CreateButton'
import GridList from '@approbado/lib/components/GridList';

const TriviaList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState(null)
    const [trivias, setTrivias] = React.useState([])

    const fetchTrivias = async () => {
        const { success, data } = await listTrivias();

        if (success) {
            setTrivias(data);
        } else {
            console.log("error", data)
        }
    }

    React.useEffect(() => { fetchTrivias() }, [])

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setFilter({
                global_search: e.currentTarget.value
            })
        } else {
            setFilter(null)
        }
    }

    React.useEffect(() => {
        fetchTrivias()
    }, [filter])

    return (
        <ListContainer
            title={
                <Box component='h5' sx={{ margin: '1rem 0' }}>
                    Trivias
                </Box>
            }
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
                    <CreateButton to='/trivias/create' label='Crear' />
                </Box>
            }
            list={
                <Box marginTop='1rem'>
                    <GridList
                        data={trivias}
                        component={<TriviaCard />}
                    />
                </Box>
            }
        />
    );
}

export default TriviaList;
