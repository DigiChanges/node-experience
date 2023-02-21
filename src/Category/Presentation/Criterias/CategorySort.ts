import Sort from '../../../Shared/Presentation/Requests/Sort';

class CategorySort extends Sort
{
    static readonly TITLE: string = 'title';
    static readonly ENABLE: string = 'ENABLE';

    getFields(): string[]
    {
        return [
            CategorySort.TITLE,
            CategorySort.ENABLE
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [CategorySort.TITLE]: 'asc' }
        ];
    }
}

export default CategorySort;
