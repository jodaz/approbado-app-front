import * as React from 'react';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import LinkButton from '@approbado/lib/components/LinkButton'
import { useForumsDispatch } from '@approbado/lib/hooks/useForums'
// Icons
import ProfileIcon from '@approbado/lib/icons/ProfileIcon'
import ReportDialog from './ReportDialog'

const ForumCardMenuOptions = React.forwardRef(({ record, user }, ref) => {
    const { unset } = useForumsDispatch()

    return (
        <OptionsCardMenu ref={ref}>
            {(user.id == record.owner.id) && (
                <LinkButton to={`/forums/${record.id}/edit`} />
            )}
            {(user.id == record.owner.id) && (
                <DeleteButton
                    label='Eliminar'
                    basePath='forums'
                    confirmColor='warning'
                    confirmTitle='Eliminar foro'
                    confirmContent='¿Está seguro que desea eliminar este foro?'
                    record={record}
                    customAction={() => unset(record)}
                />
            )}
            {(user.id != record.owner.id) && (
                <LinkButton
                    label="Ver perfil"
                    to={`/users/${record.owner.id}/show`}
                    icon={<ProfileIcon />}
                />
            )}
            {(user.id != record.owner.id) && (
                <ReportDialog post_id={record.id} />
            )}
        </OptionsCardMenu>
    )
});

export default ForumCardMenuOptions
