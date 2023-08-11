import fileDownload from 'js-file-download';

const download = async (data, filename) => {
    await fileDownload(data, filename);
}

export default download
