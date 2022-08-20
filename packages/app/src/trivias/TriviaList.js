import * as React from 'react'
import { useMediaQuery, makeStyles  } from '@material-ui/core'
import { ReactComponent as BannerIllustration } from '@approbado/lib/illustrations/Banner.svg'
import LeftAngleIcon from '@approbado/lib/icons/LeftAngleIcon'
import TriviaCard from './TriviaCard'
import GridList from '@approbado/lib/components/GridList'
import Drawer from '@material-ui/core/Drawer'
import Temary from './temary'
import SelectTrivia from './components/SelectTrivia'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// Hooks
import { useTriviaState, useTriviaDispatch } from "@approbado/lib/hooks/useTriviaSelect"
import { usePlan } from '@approbado/lib/hooks/useUserState'
import useDetectOutsideClick from '@approbado/lib/hooks/useDetectOutsideClick'
import { axios } from '@approbado/lib/providers'
import TextField from '@material-ui/core/TextField'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'

const drawerWidth = 300

const useStyles = makeStyles(() => ({
    drawerPaper: {
        width: drawerWidth,
        paddingTop: '2rem'
    },
    unsetTriviaButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '4.5rem',
        marginBottom: '1rem',
        fontSize: '0.95rem'
    }
}))

const TriviaList = () => {
    const [trivias, setTrivias] = React.useState([])
    const classes = useStyles()
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const wrapperRef = React.useRef(null)
    const outsideClick = useDetectOutsideClick(wrapperRef)
    const { selected, trivia } = useTriviaState()
    const { found: isFreeMembership} = usePlan('Free')
    const { unsetTrivia } = useTriviaDispatch()
    const [filter, setFilter] = React.useState(null)

    const fetchTrivias = async () => {
        const res = await axios({
            method: 'GET',
            url: '/trivias',
            params: getQueryFromParams({ filter })
        })

        setTrivias(res.data.data)
    }

    const renderSelectedTriviaContent = () => (
        <Box padding='0 1rem' width={isSmall ? 'unset' : '20%'} display={!selected && 'none'}>
            {(!trivia.is_free && isFreeMembership) ? (
                <BannerIllustration />
            ) : (
                <Temary {...trivia} />
            )}
        </Box>
    )

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setFilter({
                global_search: e.currentTarget.value
            })
        } else {
            setFilter(null)
        }
    }

    React.useEffect(() => {
        if (outsideClick) { unsetTrivia() }
    }, [outsideClick])

    React.useEffect(() => {
        fetchTrivias()
    }, [filter])

    return (
        <Box display="flex" height='100%' width='100%'>
            <Box width={isSmall ? '100%' : '80%'}>
                <Typography variant='h5'>
                    Trivias
                </Typography>
                <Box width={isSmall ? '100%' : '30%'} paddingTop='1em' paddingBottom='1.1rem'>
                    <TextField
                        onChange={handleOnChange}
                        placeholder='Buscar'
                        fullWidth
                    />
                </Box>
                <GridList component={<TriviaCard />} data={trivias} />
            </Box>
            {(isSmall) ? (
                <Drawer
                    variant="persistent"
                    anchor='right'
                    open={selected}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={() => unsetTrivia()}
                    ModalProps={{ keepMounted: true }}
                    ref={wrapperRef}
                >
                    <Box className={classes.unsetTriviaButton} onClick={() => unsetTrivia()}>
                        <LeftAngleIcon />
                        Volver
                    </Box>
                    {renderSelectedTriviaContent()}
                </Drawer>
            ) : (!selected)
            ? <SelectTrivia />
            : renderSelectedTriviaContent()}
        </Box>
    )
}

export default TriviaList
