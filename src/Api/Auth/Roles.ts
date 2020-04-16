
class Roles
{
    static readonly ADMIN: string = 'admin';
    static readonly OPERATOR: string = 'operator';

    getRoles(): any
    {
        return {
            [Roles.ADMIN]: [
                'all'
            ],
            [Roles.OPERATOR]: [
                'items.create',
                'items.update',
                'items.show',
                'items.list',
            ]
        };
    }
}

export default Roles;