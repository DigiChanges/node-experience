import { Sort } from '@digichanges/shared-experience';

class RoleSort extends Sort
{
    static readonly SLUG: string = 'slug';

    getFields(): string[]
    {
        return [
            RoleSort.SLUG
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [RoleSort.SLUG]: 'asc' }
        ];
    }
}

export default RoleSort;
