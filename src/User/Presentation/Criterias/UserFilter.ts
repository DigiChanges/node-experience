import Filter from '../../../Shared/Presentation/Requests/Filter';

class UserFilter extends Filter
{
    static readonly EMAIL: string = 'email';
    static readonly ENABLE: string = 'enable';
    static readonly IS_SUPER_ADMIN: string = 'isSuperAdmin';

    getFields(): any
    {
        return [
            UserFilter.EMAIL,
            UserFilter.ENABLE,
            UserFilter.IS_SUPER_ADMIN
        ];
    }

    getDefaultFilters(): any
    {
        return [
            { [UserFilter.IS_SUPER_ADMIN]: false }
        ];
    }
}

export default UserFilter;
