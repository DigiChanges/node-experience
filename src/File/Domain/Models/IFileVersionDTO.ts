import internal from 'stream';
import IFileVersionDomain from '../Entities/IFileVersionDomain';

interface IFileVersionDTO
{
    metadata: IFileVersionDomain;
    stream: internal.Readable;
}

export default IFileVersionDTO;
