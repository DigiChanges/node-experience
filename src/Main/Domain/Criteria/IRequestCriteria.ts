import { IFilter } from './IFilter';
import { ISort } from './ISort';
import { IPagination } from './IPagination';

export interface IRequestCriteria
{
    filter: IFilter;
    sort: ISort;
    pagination: IPagination;
}
