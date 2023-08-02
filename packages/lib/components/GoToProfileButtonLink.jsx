import * as React from 'react'
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'

const GoToProfileButtonLink = ({
    basePath,
    record,
    scrollToTop = true,
    ...rest
}) => (
    <Link
        to={`/${record.user_name}`}
        color='info'
        underline='hover'
        component={LinkBehavior}
    >
        Ver perfil
    </Link>
);

export default GoToProfileButtonLink
