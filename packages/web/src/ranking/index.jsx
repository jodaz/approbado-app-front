import * as React from 'react'
import { Search } from '@approbado/lib/icons'
import Box from '@material-ui/core/Box'
import { apiProvider as axios } from '@approbado/lib/api'
import RankingTable from './RankingTable'
import Spinner from '@approbado/lib/components/Spinner'
import TextField from '@material-ui/core/TextField'
import { useMediaQuery } from '@material-ui/core'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const initialUrl = `/users?page=0&perPage=5&sort=points&order=desc`

const RankingList = () => {
    const [data, setData] = React.useState(initialState)
    const [url, setUrl] = React.useState(initialUrl)
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )

    const fetchUsers = async () => {
        const { data } = await axios.get(url)

        setData({ ...data, loaded: true })
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setUrl(`${initialUrl}+&filter%5Bglobal_search%5D=${e.currentTarget.value}`)
        } else {
            setUrl(initialUrl)
        }
    }

    React.useEffect(() => {
        setData({ ...data, loaded: false })
        fetchUsers();
    }, [url])

    return (
        <Box display='flex' flexDirection='column'>
            <Box width={isSmall ? '100%' : '636px'}>
                <TextField
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: (
                            <Box marginLeft='6px' display='flex'>
                                <Search />
                            </Box>
                        )
                    }}
                    placeholder='Buscar'
                    fullWidth
                />
            </Box>
            {data.loaded ? <RankingTable {...data} /> : (
                <Box sx={{
                    display: 'flex',
                    padding: '2rem 0'
                }}>
                    <Spinner />
                </Box>
            )}
        </Box>
    )
}

export default RankingList
