import * as React from 'react'
import RibbonIllustration from '@approbado/lib/illustrations/Ribbon.svg';import NoContent from '@approbado/lib/components/NoContent'
import GridList from '@approbado/lib/components/GridList';
import { useParams } from 'react-router-dom'
import { listAwards } from '@approbado/lib/services/awards.services';
import AwardBadge from './AwardBadge'

const CertificationsListView = () => {
    const { username } = useParams();
    const [error, setError] = React.useState(false)
    const [awards, setAwards] = React.useState([]);

    const fetchAwards = async () => {
        const { success, data } = await listAwards({
            filter: { user_name: username },
            sort: { field: 'created_at', order: 'DESC'}
        });

        if (success) {
            setAwards(data)
        } else {
            setError(data)
        }
    }

    React.useEffect(() => {
        fetchAwards();
    }, [])

    return (
        <GridList
            data={awards}
            component={<AwardBadge />}
            empty={
                <NoContent
                    icon={<RibbonIllustration />}
                    title='Aún no hay certificaciones'
                />
            }
            error={error}
        />
    );
}

export default CertificationsListView;
