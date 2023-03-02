import Sort from '../../../Shared/Presentation/Requests/Sort';

class CategorySort extends Sort {
  static readonly TITLE: string = 'title';

  getFields(): string[] {
    return [CategorySort.TITLE];
  }

  getDefaultSorts(): Record<string, 'asc' | 'desc'>[] {
    return [{ [CategorySort.TITLE]: 'asc' }];
  }
}

export default CategorySort;
