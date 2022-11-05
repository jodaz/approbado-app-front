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
    const [certs, setCerts] = React.useState([])

    const fetchCerts = async () => {
        const res = await axios({
            method: 'GET',
            url: '/awards',
            params: getQueryFromParams({ user_name: username })
        })

        setCerts(res.data.data);
    }

    React.useEffect(() => {
        fetchCerts();
    }, [username])

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
        />
    );
}

export default CertificationsListView;
