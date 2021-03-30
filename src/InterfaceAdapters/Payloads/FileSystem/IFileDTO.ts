import internal from 'stream';
import IFileDomain from '../../IDomain/IFileDomain';

interface IFileDTO
{
    metadata: IFileDomain;
    stream: internal.Readable;
}

export default IFileDTO;