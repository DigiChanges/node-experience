import internal from 'stream';
import IFileDomain from '../Entities/IFileDomain';
import IFileDTO from './IFileDTO';

class FileDTO implements IFileDTO
{
    private _metadata: IFileDomain;
    private _stream: internal.Readable;

    constructor(metadata: IFileDomain, stream: internal.Readable)
    {
        this._metadata = metadata;
        this._stream = stream;
    }

    public get metadata(): IFileDomain
    {
        return this._metadata;
    }

    public set metadata(v: IFileDomain)
    {
        this._metadata = v;
    }

    public get stream(): internal.Readable
    {
        return this._stream;
    }
    public set stream(v: internal.Readable)
    {
        this._stream = v;
    }
}

export default FileDTO;
