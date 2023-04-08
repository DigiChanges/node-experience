import IGroupPermission from './IGroupPermission';

class Permissions
{
    // AUTH
    static readonly AUTH_SYNC_PERMISSIONS: string = 'res:auth#scopes:syncPermissions';
    static readonly AUTH_GET_ME: string = 'res:auth#scopes:getMe';
    static readonly AUTH_GET_PERMISSIONS: string = 'res:auth#scopes:getPermissions';

    // ITEMS
    static readonly ITEMS_SAVE: string = 'res:items#scopes:create';
    static readonly ITEMS_UPDATE: string = 'res:items:#scopes:update';
    static readonly ITEMS_SHOW: string = 'res:items:#scopes:show';
    static readonly ITEMS_LIST: string = 'res:items:#scopes:list';
    static readonly ITEMS_DELETE: string = 'res:items:#scopes:delete';

    // USERS
    static readonly USERS_SAVE: string = 'res:users#scopes:create';
    static readonly USERS_UPDATE: string = 'res:users#scopes:update';
    static readonly USERS_SHOW: string = 'res:users#scopes:show';
    static readonly USERS_LIST: string = 'res:users#scopes:list';
    static readonly USERS_DELETE: string = 'res:users#scopes:delete';
    static readonly USERS_ASSIGN_ROLE: string = 'res:users#scopes:assignRole';
    static readonly USERS_CHANGE_MY_PASSWORD: string = 'res:users#scopes:changeMyPassword';
    static readonly USERS_CHANGE_USER_PASSWORD: string = 'res:users#scopes:changeUserPassword';
    static readonly USERS_ACTIVE: string = 'res:users#scopes:active';

    // FILES
    static readonly FILES_UPLOAD: string = 'res:files#scopes:upload';
    static readonly FILES_UPDATE: string = 'res:files#scopes:update';
    static readonly FILES_DOWNLOAD: string = 'res:files#scopes:download';
    static readonly FILES_DELETE: string = 'res:files#scopes:delete';
    static readonly FILES_LIST: string = 'res:files#scopes:list';
    static readonly FILES_SHOW_METADATA: string = 'res:files#scopes:showMetadata';

    // ROLES
    static readonly ROLES_SAVE: string = 'res:roles#scopes:create';
    static readonly ROLES_UPDATE: string = 'res:roles#scopes:update';
    static readonly ROLES_SHOW: string = 'res:roles#scopes:show';
    static readonly ROLES_LIST: string = 'res:roles#scopes:list';
    static readonly ROLES_DELETE: string = 'res:roles#scopes:delete';

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
            },
            {
                group: 'USERS',
                permissions: [
                    Permissions.USERS_SAVE,
                    Permissions.USERS_UPDATE,
                    Permissions.USERS_SHOW,
                    Permissions.USERS_LIST,
                    Permissions.USERS_DELETE,
                    Permissions.USERS_ASSIGN_ROLE,
                    Permissions.USERS_CHANGE_MY_PASSWORD,
                    Permissions.USERS_CHANGE_USER_PASSWORD
                ]
            },
            {
                group: 'FILES',
                permissions: [
                    Permissions.FILES_UPLOAD,
                    Permissions.FILES_UPDATE,
                    Permissions.FILES_DELETE,
                    Permissions.FILES_DOWNLOAD,
                    Permissions.FILES_LIST,
                    Permissions.FILES_SHOW_METADATA
                ]
            },
            {
                group: 'ROLES',
                permissions: [
                    Permissions.ROLES_SAVE,
                    Permissions.ROLES_UPDATE,
                    Permissions.ROLES_SHOW,
                    Permissions.ROLES_LIST,
                    Permissions.ROLES_DELETE
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
