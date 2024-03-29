import * as React from 'react';
import { MoreHorizontal } from '@approbado/lib/icons'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import makeStyles from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Dot from '@approbado/lib/components/Dot'
import Box from '@material-ui/core/Box';
import { ChevronDown, ChevronUp } from '@approbado/lib/icons';
import Button from '@material-ui/core/Button';
import Tag from '@approbado/lib/components/Tag'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import DeleteEvent from './DeleteEvent'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditEvent from './EditEvent';
import { useUserState } from '@approbado/lib/hooks/useUserState'

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        marginBottom: '1rem'
    },
    expand: {
        padding: 0
    },
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main,
        borderLeft: props => `6px solid ${props.color}`,
        borderRadius: '4px',
        paddingLeft: '1rem'
    },
    header: {
        padding: '0rem'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.info.light,
        fontSize: '0.8rem'
    }
}));

const Description = ({ title, children }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        padding: '1rem 0'
    }}>
        <Box sx={{ color: '#6D6D6D', marginBottom: '0.3rem' }}>
            {title}
        </Box>
        {children}
    </Box>
)

const ScheduledTriviaCard = props => {
    const {
        description,
        starts_at,
        level,
        participants,
        subtheme,
        title,
        created_by
    } = props
    const classes = useStyles({ color: level.color });
    const [expanded, setExpanded] = React.useState(false);
    const anchorRef = React.useRef(null);
    const { user } = useUserState();
    const isOwner = user.id == created_by

    const handleExpandClick = e => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            setExpanded(!expanded);
        }
        e.preventDefault();
    };

    const handleClose = () => {
        setExpanded(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Card ref={anchorRef} className={classes.root} onClick={handleExpandClick}>
                <CardHeader
                    className={classes.header}
                    action={(isOwner) && (
                        <OptionsCardMenu icon={<MoreHorizontal />}>
                            <EditEvent {...props} />
                            <DeleteEvent {...props} />
                        </OptionsCardMenu>
                    )}
                    title={
                        <Typography className={classes.title}>
                            Trivia Grupal
                        </Typography>
                    }
                />
                <Box className={classes.actions}>
                    <Box className={classes.subheader}>
                        <Box variant='subtitle2'>
                            {format(new Date(starts_at), 'eee. d, MMMM', { locale: es }).toUpperCase()}
                        </Box>
                        <Dot />
                        <Box variant='subtitle2'>
                            {format(new Date(starts_at), 'p')}
                        </Box>
                    </Box>
                    <IconButton
                        className={classes.expand}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {!expanded ? <ChevronDown /> : <ChevronUp /> }
                    </IconButton>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ marginTop: '1rem' }}>
                        <Button color="primary" fullWidth>
                            Ingresar a la trivia
                        </Button>
                        <Description title='Título'>
                            <Box fontWeight='600'>
                                {title}
                            </Box>
                        </Description>
                        <Description title='Trivia'>
                            <Box fontWeight='600'>
                                {subtheme.trivia.name}
                            </Box>
                        </Description>
                        <Description title='Tema'>
                            <Box fontWeight='600'>
                                Tema en especifico
                            </Box>
                        </Description>
                        <Description title='Nivel'>
                            <Box fontWeight='600'>
                                {level.name}
                            </Box>
                        </Description>
                        <Description title='Participantes'>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}>
                                {participants.map((item, i) => (
                                    <Tag key={i} name={item.names} />
                                ))}
                            </Box>
                        </Description>
                        {description && (
                            <Description title='Descripción'>
                                <Box fontWeight='600'>
                                {description}
                                </Box>
                            </Description>
                        )}
                    </Box>
                </Collapse>
            </Card>
        </ClickAwayListener>
    );
}

ScheduledTriviaCard.defaultProps = {
    level: {
        color: '#2280ED'
    }
}

export default ScheduledTriviaCard
