import { Filter } from '@digichanges/shared-experience';

class ItemFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): string[]
    {
        return [
            ItemFilter.NAME,
            ItemFilter.TYPE
        ];
    }

    getDefaultFilters(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default ItemFilter;
