import Permissions from './Permissions';

class Roles
{
    static readonly ADMIN: string = 'Admin';
    static readonly OPERATOR: string = 'Operator';

    static getRoles(): Map<string, string[]>
    {
        const map = new Map<string, string[]>();

        map.set(Roles.ADMIN, [
            Permissions.AUTH_SYNC_PERMISSIONS,
            Permissions.AUTH_GET_ME,
            Permissions.AUTH_GET_PERMISSIONS,

            Permissions.ITEMS_SAVE,
            Permissions.ITEMS_UPDATE,
            Permissions.ITEMS_SHOW,
            Permissions.ITEMS_LIST,
            Permissions.ITEMS_DELETE,

            Permissions.USERS_SAVE,
            Permissions.USERS_UPDATE,
            Permissions.USERS_SHOW,
            Permissions.USERS_LIST,
            Permissions.USERS_DELETE,
            Permissions.USERS_ASSIGN_ROLE,
            Permissions.USERS_CHANGE_MY_PASSWORD,
            Permissions.USERS_CHANGE_USER_PASSWORD,
            Permissions.USERS_ACTIVE,

            Permissions.ROLES_SAVE,
            Permissions.ROLES_UPDATE,
            Permissions.ROLES_SHOW,
            Permissions.ROLES_LIST,
            Permissions.ROLES_DELETE,

            Permissions.FILES_SHOW_METADATA,
            Permissions.FILES_UPDATE,
            Permissions.FILES_UPLOAD,
            Permissions.FILES_DOWNLOAD,
            Permissions.FILES_LIST,
            Permissions.FILES_DELETE
        ]);
        map.set(Roles.OPERATOR, [
            Permissions.USERS_CHANGE_MY_PASSWORD,
            Permissions.AUTH_GET_ME,
            Permissions.ITEMS_SAVE,
            Permissions.ITEMS_UPDATE,
            Permissions.ITEMS_SHOW,
            Permissions.ITEMS_LIST,
            Permissions.FILES_UPLOAD,
            Permissions.FILES_DOWNLOAD,
            Permissions.FILES_LIST
        ]);

        return map;
    }
}

export default Roles;
