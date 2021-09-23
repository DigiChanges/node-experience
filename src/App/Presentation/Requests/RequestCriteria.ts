import { ICriteria, IFilter, IPagination, ISort } from '@digichanges/shared-experience';

abstract class RequestCriteria implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    protected constructor(sort: ISort, filter: IFilter, pagination: IPagination)
    {
        this.sort = sort;
        this.filter = filter;
        this.pagination = pagination;
    }

    getSort(): ISort
    {
        return this.sort;
    }

    getFilter(): IFilter
    {
        return this.filter;
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }
}

export default RequestCriteria;
