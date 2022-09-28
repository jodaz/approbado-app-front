import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import QuestionCard from './QuestionCard'
import AddQuestionsDialog from './AddQuestionsDialog'
import Pagination from '@approbado/lib/components/Pagination';
import { useMediaQuery } from '@material-ui/core'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'

const QuestionList = ({ record, filter, ...rest }) => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const initialValues = { trivia_id: record.id }
    const [filter, setFilter] = React.useState(initialValues)
    const [subthemes, setSubthemes] = React.useState([])

    const fetchQuestions = async () => {
        const res = await axios({
            method: 'GET',
            url: '/questions',
            params: getQueryFromParams({ filter })
        })

        setSubthemes(res.data.data);
    }

    console.log(record)
    return (
        <></>
        // <ListBase
        //     resource='questions'
        //     basePath='questions'
        //     perPage={10}
        //     filter={{ ...filter, options: true, onlyTrueOptions: true }}
        //     {...rest}
        // >
        //     <QuestionListView {...record} />
        // </ListBase>
    );
}

export default QuestionList;
