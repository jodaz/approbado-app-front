import * as React from 'react';
import { MoreHorizontal, File } from '@approbado/lib/icons'
import Card from '@material-ui/core/Card';
import configs from '@approbado/lib/configs'
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'
import Link from '@material-ui/core/Link'
import LinkButton from '@approbado/lib/components/LinkButton'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<MoreHorizontal />}>
        <LinkButton
            label="Editar"
            to={`/trivias/${props.trivia_id}/files/${props.record.id}`}
        />
        <DeleteButton
            basePath='files'
            confirmColor='warning'
            confirmTitle='Eliminar archivo'
            confirmContent={'¿Está seguro que desea eliminar este archivo?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const FileCard = ({ data, trivia_id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<File />}
                action={<OptionsMenu record={data} trivia_id={trivia_id} />}
                title={
                    <Link
                        href={`${configs.SOURCE}/${data.file}`}
                        underline="hover"
                        target="_blank"
                        color="primary"
                    >
                        {data.title}
                    </Link>
                }
                subheader={data.size}
            />
        </Card>
    );
}

FileCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default FileCard
