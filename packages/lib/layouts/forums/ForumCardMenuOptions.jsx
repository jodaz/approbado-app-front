import * as React from 'react';
import { Profile } from '../../icons';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import LinkButton from '@approbado/lib/components/LinkButton'
import { useForumsDispatch } from '@approbado/lib/hooks/useForums'
// Icons
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
                    to={`/${record.owner.user_name}`}
                    icon={<Profile />}
                />
            )}
            {(user.id != record.owner.id) && (
                <ReportDialog post_id={record.id} />
            )}
        </OptionsCardMenu>
    )
});

export default ForumCardMenuOptions
