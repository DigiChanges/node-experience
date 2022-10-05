import internal from 'stream';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IFileVersionDTO from './IFileVersionDTO';

class FileVersionDTO implements IFileVersionDTO
{
    private _metadata: IFileVersionDomain;
    private _stream: internal.Readable;

    constructor(metadata: IFileVersionDomain, stream: internal.Readable)
    {
        this._metadata = metadata;
        this._stream = stream;
    }

    public get metadata(): IFileVersionDomain
    {
        return this._metadata;
    }

    public set metadata(v: IFileVersionDomain)
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

export default FileVersionDTO;
