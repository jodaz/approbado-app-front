import * as React from 'react';
import Box from '@material-ui/core/Box'
import GridList from '@approbado/lib/components/GridList';
import QuestionCard from './QuestionCard'
import { useParams } from 'react-router-dom'
import AddQuestionsDialog from './AddQuestionsDialog'
import ListContainer from '../components/ListContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import { useMediaQuery } from '@material-ui/core'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
import TextField from '@material-ui/core/TextField'

const QuestionList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const { trivia_id, subtheme_id } = useParams();
    const initialValues = {
        onlyTrueOptions: true,
        options: true,
        trivia_id: trivia_id,
        ...(!isNaN(subtheme_id) && { subtheme_id: subtheme_id })
    }
    const [filter, setFilter] = React.useState(initialValues)
    const [questions, setQuestions] = React.useState([])

    const fetchQuestions = async () => {
        const res = await axios({
            method: 'GET',
            url: '/questions',
            params: getQueryFromParams({ filter })
        })

        setQuestions(res.data.data);
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
