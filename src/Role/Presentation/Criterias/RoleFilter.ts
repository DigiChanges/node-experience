import Filter from '../../../Shared/Presentation/Requests/Filter';

class RoleFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly SLUG: string = 'slug';
    static readonly ENABLE: string = 'enable';
    static readonly OF_SYSTEM: string = 'ofSystem';

    getFields(): any
    {
        return [
            RoleFilter.NAME,
            RoleFilter.SLUG,
            RoleFilter.ENABLE,
            RoleFilter.OF_SYSTEM
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default RoleFilter;
