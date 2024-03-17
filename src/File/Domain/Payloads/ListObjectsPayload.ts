import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface ListObjectsPayload extends FileOptionsQueryPayload
{
    recursive: boolean,
    prefix: string,
}

export default ListObjectsPayload;
