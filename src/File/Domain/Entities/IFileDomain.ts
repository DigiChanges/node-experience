import IBaseDomain from '../../../App/InterfaceAdapters/IBaseDomain';

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
}

export default IFileDomain;
