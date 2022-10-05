import IFileDomain from '../Entities/IFileDomain';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IFileDTO from './IFileDTO';

class FileDTO implements IFileDTO
{
    private readonly _file: IFileDomain;
    private readonly _versions: IFileVersionDomain[];

    constructor(file: IFileDomain, fileVersions: IFileVersionDomain[])
    {
        this._file = file;
        this._versions = fileVersions;
    }

    get file(): IFileDomain
    {
        return this._file;
    }

    get versions(): IFileVersionDomain[]
    {
        return this._versions;
    }
}

export default FileDTO;
