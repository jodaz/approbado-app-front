import * as React from 'react';
import { listFiles } from '@approbado/lib/services/files.services'
import { useMediaQuery } from '@material-ui/core'
import FileCard from './FileCard'
import ListContainer from '../components/ListContainer'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import CreateButton from '../components/CreateButton'
import GridList from '@approbado/lib/components/GridList'

const FileList = ({ record }) => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const initialValues = { trivia_id: record.id }
    const [filter, setFilter] = React.useState(initialValues)
    const [files, setFiles] = React.useState([])

    const fetchFiles = async () => {
        const { success, data } = await listFiles({
            filter: filter
        })

        if (success) {
            setFiles(data)
        }
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            console.log(e.currentTarget.value)
        } else {
            setFilter(initialValues)
        }
    }

    React.useEffect(() => {
        fetchFiles()
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
                        to={`/trivias/${record.id}/files/create`}
                        label='Crear'
                    />
                </Box>
            }
            list={
                <GridList
                    data={files}
                    component={<FileCard trivia_id={record.id} />}
                />
            }
        />
    );
}

export default FileList;
