import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';

interface IFileDomain extends IBaseDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
}

export default IFileDomain;
