import * as React from 'react'
import { useParams } from 'react-router-dom'
import ForumList from '@approbado/lib/layouts/forums/ForumList';

const Publications = () => {
    const { username } = useParams();

    return (
        <ForumList filter={{ user_name: username }} />
    );
}

export default Publications;
