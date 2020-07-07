import Sort from "../../Shared/Sort";

class ItemSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): any
    {
        return [
            ItemSort.NAME,
            ItemSort.TYPE
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[ItemSort.NAME]: 'asc'}
        ];
    }
}

export default ItemSort;