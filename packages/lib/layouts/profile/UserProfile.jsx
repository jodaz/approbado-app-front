import * as React from 'react'
import ProfileLayout from './ProfileLayout'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { apiProvider as axios } from '@approbado/lib/api';
import NotFound from '@approbado/lib/layouts/NotFound';

const UserProfile = ({ children }) => {
    const { username } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [record, setRecord] = React.useState(null)

    async function fetchRecord() {
        try {
            const res = await axios.get(`/users/profile/${username}`)
            setRecord(res.data)
        } catch (error) {
            // Handle errors
        }
        setLoading(false)
    }

    React.useEffect(() => {
        fetchRecord();
    }, [username])

    if (loading && !record) return <Spinner />;

    if (!loading && !record) return <NotFound />;

    return (
        <ProfileLayout data={record}>
            {children}
        </ProfileLayout>
    );
}

export default UserProfile
