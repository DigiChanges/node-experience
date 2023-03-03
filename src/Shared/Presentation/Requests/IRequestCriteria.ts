import IFilter from './IFilter';
import ISort from './ISort';
import IPagination from './IPagination';

interface IRequestCriteria
{
    filter: IFilter;
    sort: ISort;
    pagination: IPagination;
}

export default IRequestCriteria;
