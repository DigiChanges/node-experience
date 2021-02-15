import {Filter} from "@digichanges/shared-experience";

class ItemFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): any
    {
        return [
            ItemFilter.NAME,
            ItemFilter.TYPE
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default ItemFilter;
