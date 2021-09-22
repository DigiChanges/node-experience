import IBasicPermissions from '../../Shared/InterfaceAdapters/IBasicPermissions';

interface IFilePermissions extends IBasicPermissions
{
    readonly UPLOAD: string;
    readonly DOWNLOAD: string;
    readonly SHOW_METADATA: string;
}

export default IFilePermissions;