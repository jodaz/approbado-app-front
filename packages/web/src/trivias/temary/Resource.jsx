import * as React from 'react'
import { Download } from '@approbado/lib/icons';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as PDFIcon } from '@approbado/lib/icons/PDF.svg'
import configs from '@approbado/lib/env'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import { downloadFile } from '@approbado/lib/services/files.services';
import download from '@approbado/lib/utils/download';

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 1rem 1rem 0',
        background: 'transparent',
        width: '100%',
        height: 'max-content',
        border: 'none'
    },
    content: {
        padding: '8px 16px'
    },
    action: {
        alignSelf: 'unset'
    }
}))

export default function Resource({ id, title, size, key, file }) {
    const classes = useStyles();

    const handleDownload = React.useCallback(async () => {
        const { success, data } = await downloadFile(id);

        if (success) {
            await download(data, `${title}.pdf`)
        }
    }, [id]);

    return (
        <Card className={classes.root} key={key}>
            <CardHeader
                avatar={<PDFIcon />}
                title={
                    <Link
                        href={`${configs.SOURCE}/${file}`}
                        underline="hover"
                        target="_blank"
                        color="primary"
                    >
                        {title}
                    </Link>
                }
                subheader={size}
                className={classes.content}
                action={
                    <IconButton onClick={handleDownload}>
                        <Download />
                    </IconButton>
                }
                classes={{ action: classes.action }}
            />
        </Card>
    )
}
