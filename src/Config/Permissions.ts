import IGroupPermission from './IGroupPermission';

class Permissions
{
    // AUTH
    static readonly AUTH_SYNC_PERMISSIONS: string = 'res:auth#scopes:syncPermissions';
    static readonly AUTH_GET_ME: string = 'res:auth#scopes:getMe';
    static readonly AUTH_GET_PERMISSIONS: string = 'res:auth#scopes:getPermissions';

    // ITEMS
    static readonly ITEMS_SAVE: string = 'res:items#scopes:create';
    static readonly ITEMS_UPDATE: string = 'res:items#scopes:update';
    static readonly ITEMS_SHOW: string = 'res:items#scopes:show';
    static readonly ITEMS_LIST: string = 'res:items#scopes:list';
    static readonly ITEMS_DELETE: string = 'res:items#scopes:delete';

    static groupPermissions(): IGroupPermission[]
    {
        return [
            {
                group: 'AUTH',
                permissions: [
                    Permissions.AUTH_SYNC_PERMISSIONS,
                    Permissions.AUTH_GET_PERMISSIONS,
                    Permissions.AUTH_GET_ME
                ]
            },
            {
                group: 'ITEMS',
                permissions: [
                    Permissions.ITEMS_SAVE,
                    Permissions.ITEMS_UPDATE,
                    Permissions.ITEMS_SHOW,
                    Permissions.ITEMS_LIST,
                    Permissions.ITEMS_DELETE
                ]
            }
        ];
    }

    static permissions(): string[]
    {
        return Permissions.groupPermissions().reduce((accum, group) => accum.concat(group.permissions), []);
    }
}

export default Permissions;
