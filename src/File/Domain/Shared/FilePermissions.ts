import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<FilePermissions>()
class FilePermissions extends DomainPermissions
{
    readonly UPLOAD: string = 'filesUpload';
    readonly UPDATE: string = 'filesUpdate';
    readonly DOWNLOAD: string = 'filesDownload';
    readonly LIST: string = 'filesList';
    readonly SHOW_METADATA: string = 'filesShowMetadata';

    static get I(): FilePermissions
    {
        return <FilePermissions> this.instance ?? new FilePermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'FILES',
            permissions: this.get()
        };
    }

    get(): string[]
    {
        return this.permissions ?? [
            this.UPLOAD,
            this.UPDATE,
            this.DOWNLOAD,
            this.LIST,
            this.SHOW_METADATA
        ];
    }
}

export default FilePermissions;

