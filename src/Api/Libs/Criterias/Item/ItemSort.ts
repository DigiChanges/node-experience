import Sort from "../../../../Lib/Concrets/Sort";

class ItemSort extends Sort
{
    getSorts(): any
    {
        return [
            'name',
            'type'
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {'name': 'asc'}
        ];
    }
}

export default ItemSort;