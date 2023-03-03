import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter
{
    static readonly PRICE: string = 'price';
    static readonly TITLE: string = 'title';
    static readonly CATEGORY: string = 'category';

    getFields(): any
    {
        return [
            ProductFilter.PRICE,
            ProductFilter.TITLE,
            ProductFilter.CATEGORY
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default ProductFilter;
