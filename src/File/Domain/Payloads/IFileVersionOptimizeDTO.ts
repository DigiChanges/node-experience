import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileRepPayload from './FileRepPayload';

interface IFileVersionOptimizeDTO extends Omit<FileRepPayload, 'name' | 'version' | 'isOptimized' | 'objectPath'>
{
    file: IFileVersionPayload;
}

export default IFileVersionOptimizeDTO;
