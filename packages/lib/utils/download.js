import getQueryFromParams from './getQueryFromParams'
import fileDownload from 'js-file-download';
import { fileProvider } from '@approbado/lib/api'

const download = (url, params, filename, title = null) => {
    fileProvider({
        method: 'GET',
        url: url,
        params: {
            ...getQueryFromParams(params),
            title: title
        }
    }).then(res => {
        fileDownload(res.data, filename);
    });
}

export default download
