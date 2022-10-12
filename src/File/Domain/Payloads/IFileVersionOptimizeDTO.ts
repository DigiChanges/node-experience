import FileRepPayload from './FileRepPayload';
import IFileMultipart from '../Entities/IFileMultipart';

interface IFileVersionOptimizeDTO extends FileRepPayload
{
    file: IFileMultipart;
}

export default IFileVersionOptimizeDTO;
