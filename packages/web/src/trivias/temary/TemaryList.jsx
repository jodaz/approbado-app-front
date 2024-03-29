import React from 'react';
import AwardItem from './AwardItem'
import Spinner from '@approbado/lib/components/Spinner'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom'
import { useSubthemeState } from '@approbado/lib/hooks/useSubthemeSelect';
import { listAwardsWithSubthemes } from '@approbado/lib/services/awards.services'

export default function TemaryList({ id }) {
    const [loading, setLoading] = React.useState(false)
    const [awards, setAwards] = React.useState([])
    const [error, setError] = React.useState(false)
    const state = useSubthemeState();
    const history = useHistory();

    const fetchAwards = async () => {
        setLoading(true)
        const { success, data } = await listAwardsWithSubthemes(id);

        if (success) {
            setAwards(data);
        } else {
            console.log("error", data)
        }
        setLoading(false)
    }

    React.useEffect(() => {
        fetchAwards()
    }, [id])

    if (loading) return <Spinner />

    if (error) return (
        <Box variant="subtitle1">
            Ha ocurrido un error.
        </Box>
    )

    if (!data.length) return (
        <Box variant="subtitle1">
            Esta trivia aún no posee subtemas
        </Box>
    )

    return (
        <Box sx={{
            minHeight: 'max-content'
        }}>
            <List>
                {awards.map((item, key) => <AwardItem {...item} key={key} /> )}
            </List>
            <Box marginTop='2rem'>
                <Button
                    color='primary'
                    fullWidth
                    onClick={() => history.push('/trivias/start')}
                    disabled={!(state.length > 0)}
                >
                    Iniciar trivia
                </Button>
            </Box>
        </Box>
    );
}
