import * as React from 'react';
import { listQuestions } from '@approbado/lib/services/questions.services'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import GridList from '@approbado/lib/components/GridList';
import QuestionCard from './QuestionCard'
import AddQuestionsDialog from './AddQuestionsDialog'
import ListContainer from '../components/ListContainer'
import TextField from '@material-ui/core/TextField'

const QuestionList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const { trivia_id, subtheme_id } = useParams();
    const initialValues = {
        options: true,
        trivia_id: trivia_id,
        ...(!isNaN(subtheme_id) && { subtheme_id: subtheme_id })
    }
    const [filter, setFilter] = React.useState(initialValues)
    const [questions, setQuestions] = React.useState([])

    const fetchQuestions = async () => {
        const { success, data } = await listQuestions({
            filter: filter
        });

        if (success) {
            setQuestions(data);
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
        fetchQuestions();
    }, []);

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
                    {!isNaN(subtheme_id) && (
                        <AddQuestionsDialog />
                    )}
                </Box>
            }
            list={
                <GridList
                    data={questions}
                    component={<QuestionCard />}
                />
            }
        />
    );
}

export default QuestionList;
