import Filter from "../../Shared/Filter";

class ItemFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';
    static readonly ENABLE: string = 'enable';

    getFields(): any
    {
        return [
            ItemFilter.NAME,
            ItemFilter.TYPE,
            ItemFilter.ENABLE,
        ];
    }

    getDefaultFilters(): any
    {
        return [
            {[ItemFilter.ENABLE]: true}
        ];
    }
}

export default ItemFilter;