import * as React from 'react'
import { ReactComponent as RibbonIllustration } from '@approbado/lib/illustrations/Ribbon.svg'
import NoContent from '@approbado/lib/components/NoContent'
import GridList from '@approbado/lib/components/GridList';
import { useParams } from 'react-router-dom'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import AwardBadge from './AwardBadge'

const CertificationsListView = () => {
    const { username } = useParams();
    const [error, setError] = React.useState(false)
    const [certs, setCerts] = React.useState([])

    const fetchAwards = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: '/awards',
                params: getQueryFromParams({
                    filter: { user_name: username }
                 })
            })

            setCerts(res.data.data);
        } catch (error) {
            setError(true)
        }
    }

    React.useEffect(() => {
        fetchAwards();
    }, [])

    return (
        <GridList
            data={certs}
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
