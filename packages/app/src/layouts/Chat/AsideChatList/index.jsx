import * as React from 'react';
import Box from '@material-ui/core/Box';
import AsideBarHeader from './AsideBarHeader';
import useFetch from '@approbado/lib/hooks/useFetch'
import ChatsList from './ChatsList';
import makeStyles from '@material-ui/styles/makeStyles';
import { useChatDispatch, useChatState } from '@approbado/lib/hooks/useChat';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 300
        },
        height: '100%',
        boxShadow: '1px 0px 0px rgba(0, 0, 0, 0.24)',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const results = 10

const generateNullData = results => Array.from({ length: results }).map(_ => null)

const AsideChatList = () => {
    const classes = useStyles();
    const [perPage, setPerPage] = React.useState(results)
    const [filter, setFilter] = React.useState({})
    const {
        loading,
        error,
        data,
        hasMore
    } = useFetch('/chats', {
        perPage: perPage,
        page: 1,
        filter: filter
    })
    const observer = React.useRef()
    const { chats, total } = useChatState();
    const { setChatlist } = useChatDispatch();

    const handleChange = e => {
        if (e.currentTarget.value) {
            setFilter({
                name: e.currentTarget.value
            })
        } else {
            setFilter({})
        }
    }

    const lastItemRef = React.useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setChatlist(prevItems => {
                    return [...prevItems, ...generateNullData(results)]
                })
                setPerPage(prevPerPage => prevPerPage + results)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    React.useEffect(() => {
        if (data.length) {
            setChatlist(data)
        }

        if (data.length == 0 && !loading) {
            setChatlist([])
        }
    }, [data, loading])

    React.useEffect(() => {
        setChatlist(generateNullData(results))
    }, [])

    return (
        <Box className={classes.root}>
            <AsideBarHeader onChange={handleChange} />
            <Box
                component='div'
                sx={{
                    width: 'inherit',
                    overflowY: 'auto',
                    height: 'inherit',
                    overflowX: 'hidden',
                    scrollbarWidth: 10,
                    scrollbarColor: '#6D6D6D',
                    "&::-webkit-scrollbar": {
                        width: 10
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#D9D9D9",
                        borderRadius: 5
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#6D6D6D",
                        borderRadius: 5
                    }
                }}
            >
                <ChatsList
                    total={total}
                    error={error}
                    loading={loading}
                    items={chats}
                    lastItemRef={lastItemRef}
                />
            </Box>
        </Box>
    );
}

export default AsideChatList;
