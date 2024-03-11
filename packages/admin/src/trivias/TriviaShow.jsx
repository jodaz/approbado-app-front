import * as React from 'react';
import {
    Balance,
    MoreHorizontal
} from '@approbado/lib/icons'
import { useHistory, useParams } from 'react-router-dom'
import { getTrivia } from '@approbado/lib/services/trivias.services';
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';
import Header from '../components/Header'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import Admin from '../layouts/Admin';
import Spinner from '@approbado/lib/components/Spinner'

const tags = id => ([
    {
        name: 'Subtemas',
        pathname: `/trivias/${id}/subthemes`
    },
    {
        name: 'Archivos',
        pathname: `/trivias/${id}/files`
    },
    {
        name: 'Premios',
        pathname: `/trivias/${id}/awards`
    },
    {
        name: 'Preguntas',
        pathname: `/trivias/${id}/questions`,
    },
    {
        name: 'General',
        pathname: `/trivias/${id}`
    },
])

const OptionsMenu = props => {
    const history = useHistory();

    return (
        <OptionsCardMenu icon={<MoreHorizontal />}>
            <DeleteButton
                basePath='trivias'
                confirmColor='warning'
                confirmTitle='Eliminar trivia'
                confirmContent='¿Está seguro que desea eliminar esta trivia?'
                label='Eliminar'
                customAction={() => history.push('/trivias')}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const TriviaShow = ({ children }) => {
    const { trivia_id } = useParams();
    const [record, setRecord] = React.useState(null)

    const fetchRecord = async () => {
        const { success, data } = await getTrivia(trivia_id)

        if (success) {
            setRecord(data)
        }
    }

    React.useEffect(() => {
        fetchRecord();
    }, [trivia_id])

    return (
        <Admin>
            {!!record ? (
                <Box display="flex" marginTop="2rem" flexDirection='column'>
                    <Header
                        record={record}
                        icon={<Balance size='1.5em' />}
                        name='Trivia'
                        menu={<OptionsMenu record={record} />}
                    />
                    <TabbedList
                        tags={tags(trivia_id)}
                    />
                    {React.Children.map(children, child => (
                        React.cloneElement(child, {
                            record: record
                        })
                    ))}
                </Box>
            ) : <Spinner />}
        </Admin>
    )
}

export default TriviaShow;
