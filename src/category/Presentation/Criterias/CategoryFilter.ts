import Filter from '../../../Shared/Presentation/Requests/Filter';

class CategoryFilter extends Filter
{
    static readonly TITLE: string = 'title';
    static readonly ENABLE: string = 'enable';

    getFields(): any
    {
        return [
            CategoryFilter.TITLE,
            CategoryFilter.ENABLE
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default CategoryFilter;
