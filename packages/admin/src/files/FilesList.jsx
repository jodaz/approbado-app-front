import * as React from 'react';
import FileCard from './FileCard'
import ListContainer from '../components/ListContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { useMediaQuery } from '@material-ui/core'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
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
        const res = await axios({
            method: 'GET',
            url: '/files',
            params: getQueryFromParams({ filter })
        })

        setFiles(res.data.data);
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
