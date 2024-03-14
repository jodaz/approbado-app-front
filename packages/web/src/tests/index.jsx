import * as React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { listTrivias } from '@approbado/lib/services/trivias.services'
// Components
import TestCard from './TestCard'

const initialState = {
    data: [],
    total: 0,
    loaded: false
}

const TestList = () => {
    const [popularTrivias, setPopularTrivias] = React.useState(initialState)
    const [newTrivias, setNewTrivias] = React.useState(initialState)

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            console.log(data)
            setNewTrivias({ data: data, loaded: true })
        }
    }, []);

    const fetchPopularTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias({
            filter: {
                top: true
            }
        })

        if (success) {
            setPopularTrivias({ data: data, loaded: true })
        }
    }, []);

    const renderer = ({ data }) => (
        <Box margin='1rem 0'>
            <Grid container>
                {data.map((trivia, i) => (
                    <Grid item md={4}>
                        <TestCard key={i} {...trivia} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )

    React.useEffect(() => {
        fetchTrivias();
        fetchPopularTrivias();
    }, [])

    return (
        <Box display='flex' height="100%" flexDirection='column'>
            <Box marginBottom='1rem' flex="1">
                <Box component='strong'>
                    Continúa con tu prueba
                </Box>
                {(newTrivias.loaded) ? (
                    <Box>
                        {renderer(newTrivias)}
                    </Box>
                ) : (
                    <Box>
                        No hay trivias disponibles
                    </Box>
                )}
            </Box>
            <Box marginBottom='1rem' flex="1">
                <Box component='strong'>
                Pruebas populares - Estas listo? 🔥
                </Box>
                {(popularTrivias.loaded) ? (
                    <Box>
                        {renderer(popularTrivias)}
                    </Box>
                ) : (
                    <Box>
                        No hay trivias disponibles
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default TestList
