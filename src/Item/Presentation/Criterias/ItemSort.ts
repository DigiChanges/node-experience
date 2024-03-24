import { Sort } from '../../../Main/Domain/Criteria';

class ItemSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): string[]
    {
        return [
            ItemSort.NAME,
            ItemSort.TYPE
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [ItemSort.NAME]: 'asc' }
        ];
    }
}

export default ItemSort;
