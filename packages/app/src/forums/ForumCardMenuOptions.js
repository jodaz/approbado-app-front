import * as React from 'react';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import MenuButton from '@approbado/lib/components/MenuButton'
import ProfileIcon from '@approbado/lib/icons/ProfileIcon'
import { ReactComponent as InformationIcon } from '@approbado/lib/icons/Information.svg'

const ForumCardMenuOptions = React.forwardRef((props, ref) => {
    const { record, user, history } = props;

    return (
        <OptionsCardMenu ref={ref}>
            {(user.id == record.owner.id) && (
                <DeleteButton
                    label='Eliminar'
                    basePath='forums'
                    confirmColor='warning'
                    confirmTitle='Eliminar foro'
                    confirmContent='¿Está seguro que desea eliminar este foro?'
                    label='Eliminar'
                    {...record}
                />
            )}
            {(user.id != record.owner.id) && (
                <MenuButton
                    label="Ver perfil"
                    onClick={() => history.push(`/users/${record.owner.id}/show`)}
                    icon={<ProfileIcon />}
                />
            )}
            {(user.id != record.owner.id) && (
                <MenuButton
                    label="Reportar"
                    icon={<InformationIcon />}
                />
            )}
        </OptionsCardMenu>
    )
});

export default ForumCardMenuOptions