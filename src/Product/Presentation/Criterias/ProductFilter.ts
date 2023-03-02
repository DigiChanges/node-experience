import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter {
  static readonly TITLE: string = 'title';
  static readonly PRICE: string = 'price';

  getFields(): any {
    return [ProductFilter.TITLE, ProductFilter.PRICE];
  }

  getDefaultFilters(): any {
    return [];
  }
}

export default ProductFilter;
