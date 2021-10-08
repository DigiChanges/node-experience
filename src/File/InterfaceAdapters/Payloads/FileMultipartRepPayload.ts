import FileRepPayload from './FileRepPayload';

interface FileMultipartRepPayload extends FileRepPayload
{
    get_file(): Express.Multer.File
}

export default FileMultipartRepPayload;
