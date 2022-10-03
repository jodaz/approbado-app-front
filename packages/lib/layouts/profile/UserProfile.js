import * as React from 'react'
import ProfileLayout from './ProfileLayout'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { JSONAxiosInstance as axios } from '@approbado/lib/api';
import NotFound from '@approbado/lib/layouts/NotFound';

const UserProfile = ({ children }) => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [record, setRecord] = React.useState(null)

    async function fetchRecord() {
        try {
            const res = await axios.get(`/users/profile/${id}`)
            setRecord(res.data)
        } catch (error) {
            // Handle errors
        }
        setLoading(false)
    }

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (loading && !record) return <Spinner />;

    if (!loading && !record) return <NotFound />;

    return (
        <ProfileLayout data={record}>
            {children}
        </ProfileLayout>
    );
}

export default UserProfile
