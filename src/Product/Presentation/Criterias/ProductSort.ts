import Sort from '../../../Shared/Presentation/Requests/Sort';

class ProductSort extends Sort
{
    static readonly PRICE: string = 'price';
    static readonly TITLE: string = 'title';
    static readonly CATEGORY: string = 'category';

    getFields(): string[]
    {
        return [
            ProductSort.PRICE,
            ProductSort.TITLE,
            ProductSort.CATEGORY
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
