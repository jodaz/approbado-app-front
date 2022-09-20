import getQueryFromParams from './getQueryFromParams'
import fileDownload from 'js-file-download';
import { BlobAxiosInstance } from '@approbado/lib/api'

const download = (url, params, filename, title = null) => {
    BlobAxiosInstance({
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
