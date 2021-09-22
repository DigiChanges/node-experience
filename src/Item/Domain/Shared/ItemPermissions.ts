import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<ItemPermissions>()
class ItemPermissions extends DomainPermissions
{
    readonly SAVE: string = 'itemsSave';
    readonly UPDATE: string = 'itemsUpdate';
    readonly SHOW: string = 'itemsShow';
    readonly LIST: string = 'itemsList';
    readonly DELETE: string = 'itemsDelete';

    static get I(): ItemPermissions
    {
        return <ItemPermissions> this.instance ?? new ItemPermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'ITEMS',
            permissions: this.get()
        };
    }

    get(): string[]
    {
        return this.permissions ?? [
            this.SAVE,
            this.UPDATE,
            this.SHOW,
            this.LIST,
            this.DELETE
        ];
    }
}

export default ItemPermissions;

