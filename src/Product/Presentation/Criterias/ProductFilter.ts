import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter
{
    static readonly PRICE: string = 'price';
    static readonly TITLE: string = 'title';
    static readonly ACTIVE: string = 'active';

    getFields(): any
    {
        return [
            ProductFilter.PRICE,
            ProductFilter.TITLE,
            ProductFilter.ACTIVE
        ];
    }

    getDefaultFilters(): any
    {
        return [
            { [ProductFilter.ACTIVE]: true }
        ];
    }
}

export default ProductFilter;
