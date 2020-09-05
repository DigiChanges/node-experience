import Permissions from "./Permissions";

class Roles
{
    static readonly SUPER_ADMIN: string = 'superAdmin';
    static readonly ADMIN: string = 'admin';
    static readonly OPERATOR: string = 'operator';

    getRoles(): any
    {
        return {
            [Roles.SUPER_ADMIN]: [
                Permissions.ALL
            ],
            [Roles.ADMIN]: [
                Permissions.ALL
            ],
            [Roles.OPERATOR]: [
                Permissions.ITEMS_SAVE,
                Permissions.ITEMS_UPDATE,
                Permissions.ITEMS_SHOW,
                Permissions.ITEMS_LIST,
            ]
        };
    }
}

export default Roles;
