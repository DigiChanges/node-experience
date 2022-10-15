import IFileMultipart from '../Entities/IFileMultipart';
import FileRepPayload from './FileRepPayload';

interface IFileVersionOptimizeDTO extends FileRepPayload
{
    file: IFileMultipart;
}

export default IFileVersionOptimizeDTO;
