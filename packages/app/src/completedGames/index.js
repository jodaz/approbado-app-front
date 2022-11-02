import * as React from 'react'
import Box from '@material-ui/core/Box'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import FinishedSubtheme from './FinishedSubtheme'
import Grid from '@material-ui/core/Grid'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const CompletedGamesList = () => {
    const [themes, setThemes] = React.useState(initialState)
    const filter = {
        finished: true
    }

    const fetchThemes = async () => {
        const { data } = await axios({
            method: 'GET',
            url: '/subthemes',
            params: getQueryFromParams({ filter })
        })

        setThemes({...data, loaded: true })
    }

    React.useEffect(() => {
        fetchThemes();
    }, [])

    const renderer = ({ data }) => (
        <Box margin='1rem 0'>
            <Grid container>
                {data.map((item, i) => (
                    <Grid item md={4}>
                        <FinishedSubtheme key={i} {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )

    return (
        <Box display='flex' flexDirection='column'>
            {(themes.loaded) ? (
                <Box marginBottom='1rem'>
                    <Box component='strong'>
                        Continúa con tu prueba
                    </Box>
                    {renderer(themes)}
                </Box>
            ) : (
                <Box>
                    Aún no has culminado ninguna prueba.
                </Box>
            )}
        </Box>
    )
}

export default CompletedGamesList
