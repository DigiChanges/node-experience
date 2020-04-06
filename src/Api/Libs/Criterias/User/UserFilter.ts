import Filter from "../../../../Lib/Concrets/Filter";

class UserFilter extends Filter
{
    static readonly EMAIL: string = 'email';
    static readonly ENABLE: string = 'enable';

    getFields(): any
    {
        return [
            UserFilter.EMAIL,
            UserFilter.ENABLE,
        ];
    }

    getDefaultFilters(): any
    {
        return [
            {[UserFilter.EMAIL]: true}
        ];
    }
}

export default UserFilter;