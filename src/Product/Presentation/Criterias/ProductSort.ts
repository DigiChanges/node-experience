import Sort from '../../../Shared/Presentation/Requests/Sort';

class ProductSort extends Sort
{
    static readonly TITLE: string = 'title';
    static readonly PRICE: string = 'price';

    getFields(): string[]
    {
        return [
            ProductSort.TITLE,
            ProductSort.PRICE
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [ProductSort.TITLE]: 'asc' }
        ];
    }
}

export default ProductSort;
