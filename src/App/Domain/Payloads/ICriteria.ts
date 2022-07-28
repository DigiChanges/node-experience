import IPagination from './IPagination';
import IFilter from './IFilter';
import ISort from './ISort';

interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IFilter;
    getSort(): ISort;
}

export default ICriteria;
