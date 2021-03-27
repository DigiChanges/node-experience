import FileRepPayload from './FileRepPayload';

interface FileMultipartRepPayload extends FileRepPayload
{
    getFile(): Express.Multer.File
}

export default FileMultipartRepPayload;