import Filter from '../../../Shared/Presentation/Requests/Filter';

class CategoryFilter extends Filter {
  static readonly TITLE: string = 'title';

  getFields(): any {
    return [CategoryFilter.TITLE];
  }

  getDefaultFilters(): any {
    return [];
  }
}

export default CategoryFilter;
