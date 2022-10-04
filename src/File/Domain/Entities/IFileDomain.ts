import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';

interface IFileDomain extends IBaseDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    isPublic: boolean;
    setName(hasOriginalName: boolean): void;
}

export default IFileDomain;
