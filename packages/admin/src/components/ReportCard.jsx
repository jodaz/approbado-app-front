import * as React from 'react';
import { Tag as TagIcon } from '@approbado/lib/icons'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import cardStyles from '@approbado/lib/styles/cardStyles'
import Typography from '@material-ui/core/Typography';
import Dot from '@approbado/lib/components/Dot';
import Tag from '@approbado/lib/components/Tag';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { useHistory } from 'react-router-dom'
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import { MoreHorizontal } from '@approbado/lib/icons'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<MoreHorizontal />}>
        <DeleteButton
            basePath='reports'
            confirmColor='warning'
            confirmTitle='Eliminar reporte'
            confirmContent={'¿Está seguro que desea eliminar este reporte?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const ReportCard = ({ data }) => {
    const classes = cardStyles();
    const history = useHistory();
    const date = useConvertPostgresDate(data.created_at)

    const handleRedirect = () => history.push(`/reports/${data.id}/overview`)

    const { message, summary, type, owner } = data.post

    return (
        <Card className={classes.root} key={data.id} onClick={handleRedirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                className={classes.cardHeader}
                title={
                    <Typography variant="subtitle1">
                        {(type == 'Comentario') ? summary : message}
                    </Typography>
                }
                subheader={
                    <Box display="flex" alignItems='center'>
                        <Typography variant="subtitle1">
                            {owner.user_name}
                        </Typography>
                        <Dot />
                        <Typography variant="subtitle1">
                            Reportado {data.reportsCount} veces
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Tag name={type} icon={<TagIcon />} />
                    <Typography variant="body2" component="span">
                        {date}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

ReportCard.propTypes = {
    data: PropTypes.object
}

export default ReportCard
