import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface ListObjectsPayload extends FileOptionsQueryPayload
{
    getRecursive(): boolean,
    getPrefix(): string,
}

export default ListObjectsPayload;
