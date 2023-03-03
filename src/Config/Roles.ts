import Permissions from './Permissions';

class Roles
{
    static readonly SUPER_ADMIN: string = 'SuperAdmin';
    static readonly ADMIN: string = 'Admin';
    static readonly OPERATOR: string = 'Operator';

    static getRoles(): Record<string, string[]>
    {
        return {
            [Roles.ADMIN]: [
                Permissions.USERS_CHANGE_MY_PASSWORD,
                Permissions.CATEGORY_SAVE,
                Permissions.CATEGORY_UPDATE,
                Permissions.CATEGORY_SHOW,
                Permissions.CATEGORY_LIST,
                Permissions.PRODUCT_SAVE,
                Permissions.PRODUCT_UPDATE,
                Permissions.PRODUCT_SHOW,
                Permissions.PRODUCT_LIST,
                Permissions.FILES_UPLOAD,
                Permissions.FILES_DOWNLOAD,
                Permissions.FILES_LIST
            ],
            [Roles.OPERATOR]: [
                Permissions.USERS_CHANGE_MY_PASSWORD,
                Permissions.CATEGORY_SAVE,
                Permissions.CATEGORY_UPDATE,
                Permissions.CATEGORY_SHOW,
                Permissions.CATEGORY_LIST,
                Permissions.PRODUCT_SAVE,
                Permissions.PRODUCT_UPDATE,
                Permissions.PRODUCT_SHOW,
                Permissions.PRODUCT_LIST,
                Permissions.FILES_UPLOAD,
                Permissions.FILES_DOWNLOAD,
                Permissions.FILES_LIST
            ]
        };
    }
}

export default Roles;
