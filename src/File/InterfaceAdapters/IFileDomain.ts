import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';

interface IFileDomain extends IBaseDomain
{
    name: string;
    original_name: string;
    mime_type: string;
    path: string;
    extension: string;
    size: number;
    version: number;
}

export default IFileDomain;
