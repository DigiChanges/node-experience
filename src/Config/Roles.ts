import Permissions from './Permissions';

class Roles
{
    static readonly ADMIN: string = 'Admin';
    static readonly OPERATOR: string = 'Operator';

    static getRoles(): Map<string, string[]>
    {
        const map = new Map<string, string[]>();

        map.set(Roles.ADMIN, [
            Permissions.USERS_CHANGE_MY_PASSWORD,
            Permissions.ITEMS_SAVE,
            Permissions.ITEMS_UPDATE,
            Permissions.ITEMS_SHOW,
            Permissions.ITEMS_LIST,
            Permissions.FILES_UPLOAD,
            Permissions.FILES_DOWNLOAD,
            Permissions.FILES_LIST
        ]
        );
        map.set(Roles.OPERATOR, [
            Permissions.USERS_CHANGE_MY_PASSWORD,
            Permissions.ITEMS_SAVE,
            Permissions.ITEMS_UPDATE,
            Permissions.ITEMS_SHOW,
            Permissions.ITEMS_LIST,
            Permissions.FILES_UPLOAD,
            Permissions.FILES_DOWNLOAD,
            Permissions.FILES_LIST
        ]
        );

        return map;
    }
}

export default Roles;
