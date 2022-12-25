import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IFileDomain from './IFileDomain';
import FileRepPayload from '../Payloads/FileRepPayload';

interface IFileVersionDomain extends IBaseDomain, FileRepPayload
{
    name: string;
    version: number;
    isOptimized: boolean;
    file: IFileDomain;
    objectPath: string;
    setName(hasOriginalName: boolean): void;
}

export default IFileVersionDomain;
