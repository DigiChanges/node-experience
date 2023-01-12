import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileRepPayload from './FileRepPayload';

interface IFileVersionOptimizeDTO extends FileRepPayload
{
    file: IFileVersionPayload;
}

export default IFileVersionOptimizeDTO;
