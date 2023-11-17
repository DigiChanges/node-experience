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
            Permissions.ITEMS_DELETE
        ]);
        map.set(Roles.OPERATOR, [
            Permissions.AUTH_GET_ME,
            Permissions.ITEMS_SAVE,
            Permissions.ITEMS_UPDATE,
            Permissions.ITEMS_SHOW,
            Permissions.ITEMS_LIST
        ]);

        return map;
    }
}

export default Roles;
