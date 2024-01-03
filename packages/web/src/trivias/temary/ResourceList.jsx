import * as React from 'react'
import { listFiles } from '@approbado/lib/services/files.services'
import Resource from './Resource'
import Spinner from '@approbado/lib/components/Spinner'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

const ResourceList = ({ id }) => {
    const [resources, setResources] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const fetchResources = async () => {
        setLoading(true)
        const { success, data, count } = await listFiles({
            filter: {
                trivia_id: id
            }
        });

        if (success) {
            setLoading(false)
            setTotal(count)
            setResources(data)
        } else {
            setLoading(false)
            console.log(data)
        }
    }

    React.useEffect(() => {
        fetchResources()
    }, [id])

    if (loading) return <Spinner />;

    if (!total) {
        return (
            <ErrorMessage>
                Sin recursos disponibles.
            </ErrorMessage>
        )
    }

    return (
        <div>
            {resources.map(item => (
                <Resource
                    {...item}
                />
            ))}
        </div>
    );
}

export default ResourceList;
