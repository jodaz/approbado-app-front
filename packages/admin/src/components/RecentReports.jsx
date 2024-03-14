import * as React from 'react'
import { useMediaQuery } from '@material-ui/core'
import { listReports } from '@approbado/lib/services/reports.services'
import ReportCard from './ReportCard'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import GridList from '@approbado/lib/components/GridList';
import ListContainer from '../components/ListContainer'

const initialFilter = { in_blacklist: true };

const RecentReports = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState(initialFilter)
    const [reports, setReports] = React.useState([])

    const fetchReports = async () => {
        const { success, data } = await listReports({
            filter: filter
        })

        if (success) {
            setReports(data)
        }
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
                        data={reports}
                        component={<ReportCard />}
                    />
                </Box>
            }
        />
    );
}

RecentReports.defaultProps = {
    basePath: 'reports',
    resource: 'reports'
}

export default RecentReports;
