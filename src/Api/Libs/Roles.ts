import Permissions from "./Permissions";

class Roles
{
    static readonly ADMIN: string = 'admin';
    static readonly OPERATOR: string = 'operator';

    getRoles(): any
    {
        return {
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