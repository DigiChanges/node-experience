import internal from 'stream';
import IFileDomain from '../Entities/IFileDomain';

interface IFileDTO
{
    metadata: IFileDomain;
    stream: internal.Readable;
}

export default IFileDTO;
