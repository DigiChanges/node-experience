import { Sort } from '@digichanges/shared-experience';

class RoleSort extends Sort
{
    static readonly SLUG: string = 'slug';

    getFields(): any
    {
        return [
            RoleSort.SLUG
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [RoleSort.SLUG]: 'asc' }
        ];
    }
}

export default RoleSort;
