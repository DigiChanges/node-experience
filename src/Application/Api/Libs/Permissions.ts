
class Permissions
{
    static readonly ALL: string = 'all';

    // AUTH
    static readonly AUTH_KEEP_ALIVE: string = 'authKeepAlive';

    // ITEMS
    static readonly ITEMS_SAVE: string = 'itemsSave';
    static readonly ITEMS_UPDATE: string = 'itemsUpdate';
    static readonly ITEMS_SHOW: string = 'itemsShow';
    static readonly ITEMS_LIST: string = 'itemsList';
    static readonly ITEMS_DELETE: string = 'itemsDelete';

    // USERS
    static readonly USERS_SAVE: string = 'usersSave';
    static readonly USERS_UPDATE: string = 'usersUpdate';
    static readonly USERS_SHOW: string = 'usersShow';
    static readonly USERS_LIST: string = 'usersList';
    static readonly USERS_DELETE: string = 'usersDelete';
    static readonly USERS_ASSIGN_ROLE: string = 'usersAssignRole';
    static readonly USERS_CHANGE_MY_PASSWORD: string = 'usersChangeMyPassword';
    static readonly USERS_CHANGE_USER_PASSWORD:string = 'usersChangeUserPassword';

    // ROLES
    static readonly ROLES_SAVE: string = 'rolesSave';
    static readonly ROLES_UPDATE: string = 'rolesUpdate';
    static readonly ROLES_SHOW: string = 'rolesShow';
    static readonly ROLES_LIST: string = 'rolesList';
    static readonly ROLES_DELETE: string = 'rolesDelete';

    static permissions(): object
    {
        return [
            [Permissions.ITEMS_SAVE],
            [Permissions.ITEMS_UPDATE],
            [Permissions.ITEMS_SHOW],
            [Permissions.ITEMS_LIST],
            [Permissions.ITEMS_DELETE],
            [Permissions.USERS_SAVE],
            [Permissions.USERS_UPDATE],
            [Permissions.USERS_SHOW],
            [Permissions.USERS_LIST],
            [Permissions.USERS_DELETE],
            [Permissions.USERS_CHANGE_MY_PASSWORD],
            [Permissions.USERS_CHANGE_USER_PASSWORD],
            [Permissions.ROLES_SAVE],
            [Permissions.ROLES_UPDATE],
            [Permissions.ROLES_SHOW],
            [Permissions.ROLES_LIST],
            [Permissions.ROLES_DELETE]
        ];
    }
}

export default Permissions;