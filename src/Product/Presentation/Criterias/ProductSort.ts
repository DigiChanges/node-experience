import Sort from '../../../Shared/Presentation/Requests/Sort';

class ProductSort extends Sort
{
    static readonly TITLE: string = 'title';
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): any
    {
        return [
            ProductSort.TITLE,
            ProductSort.CREATED_AT
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [ProductSort.CREATED_AT]: 'DESC' }
        ];
    }
}

export default ProductSort;
