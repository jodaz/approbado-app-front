import * as React from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Box
} from '@material-ui/core'
import { MoreHorizontal } from '@approbado/lib/icons'
import Avatar from '@approbado/lib/components/Avatar';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'
import Dot from '@approbado/lib/components/Dot';
import { ReactComponent as Certificate } from '@approbado/lib/icons/Certificate.svg'
import LinkButton from '@approbado/lib/components/LinkButton'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<MoreHorizontal />}>
        <LinkButton
            to={`/trivias/${props.record.trivia_id}/awards/${props.record.id}`}
        />
        <DeleteButton
            basePath='awards'
            confirmColor='warning'
            confirmTitle='Eliminar premio'
            confirmContent={'¿Está seguro que desea eliminar este premio?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const AwardCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root} key={id}>
            <CardHeader
                avatar={
                    (data.type === 'Insignia') ? (
                        <Avatar
                            source={data.file}
                            alt='icon'
                        />
                    ) : (
                        <Certificate />
                    )
                }
                action={<OptionsMenu record={data} />}
                title={
                    <Typography variant="subtitle1" component="h1">
                        {data.title}
                    </Typography>
                }
                subheader={
                    <Box display="flex">
                        <Typography variant="body2">{data.type}</Typography>
                        <Dot />
                        <Typography variant="body2">{data.min_points} puntos</Typography>
                    </Box>
                }
            />
        </Card>
    );
}

AwardCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default AwardCard
