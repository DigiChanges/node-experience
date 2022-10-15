import IFileDomain from '../Entities/IFileDomain';
import IFileVersionDomain from '../Entities/IFileVersionDomain';

interface IFileDTO
{
    file: IFileDomain;
    versions: IFileVersionDomain[];
}

export default IFileDTO;
