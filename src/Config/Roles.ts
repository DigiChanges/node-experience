import Permissions from './Permissions';

class Roles
{
    static readonly SUPER_ADMIN: string = 'SuperAdmin';
    static readonly ADMIN: string = 'Admin';
    static readonly OPERATOR: string = 'Operator';

    static getRoles(): Record<string, string[]>
    {
        return {
            [Roles.SUPER_ADMIN]: [
                Permissions.ALL
            ],
            [Roles.ADMIN]: [
                Permissions.ALL
            ],
            [Roles.OPERATOR]: [
                Permissions.USERS_CHANGE_MY_PASSWORD,
                Permissions.ITEMS_SAVE,
                Permissions.ITEMS_UPDATE,
                Permissions.ITEMS_SHOW,
                Permissions.ITEMS_LIST,
                Permissions.FILES_UPLOAD,
                Permissions.FILES_DOWNLOAD,
                Permissions.FILES_LIST
            ]
        };
    }
}

export default Roles;
