import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IFileDomain from './IFileDomain';

interface IFileVersionDomain extends IBaseDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    isPublic: boolean;
    isOptimized: boolean;
    file: IFileDomain;
    objectPath: string;
    isImage: boolean;
    setName(hasOriginalName: boolean): void;
}

export default IFileVersionDomain;
