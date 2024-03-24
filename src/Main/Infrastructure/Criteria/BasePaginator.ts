import { IPaginator } from '../../Domain/Criteria/IPaginator';
import { IPaginatorConfig } from './IPaginatorConfig';
import { IFilter } from '../../Domain/Criteria';
import { ISort } from '../../Domain/Criteria';
import { IPagination } from '../../Domain/Criteria/IPagination';
import { ICriteria } from '../../Domain/Criteria';

export abstract class BasePaginator implements IPaginator
{
    protected filter: IFilter;
    protected sort: ISort;
    protected pagination: IPagination;

    protected readonly limit: number;
    protected readonly offset: number;

    protected total: number;
    protected _perPage: number;
    protected perPage: number;

    protected currentPage: number;
    protected lastPage: number;
    protected from: number;
    protected to: number;

    protected readonly metadata: Record<string, any>;
    protected readonly helper?: (data: any) => Promise<any>;

    constructor(criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        this.total = 0;
        this._perPage = 5;
        this.perPage = 5;
        this.currentPage = 1;
        this.lastPage = 1;
        this.from = 0;
        this.to = 10;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
        this.offset = this.pagination.getOffset();
        this.limit = this.pagination.getLimit();
        this.metadata = config?.metadata ?? {};
        this.helper = config?.helper;
    }

    public abstract paginate(): Promise<any>;

    public getExist(): boolean
    {
        return this.pagination.getExist();
    }

    public getTotal(): number
    {
        return this.total;
    }

    public getPerPage(): number
    {
        if (this.getCurrentPage() > this.lastPage)
        {
            return 0;
        }

        return this.perPage;
    }

    public getCurrentPage(): number
    {
        return this.limit === 1 ? this.currentPage + 1 : this.currentPage;
    }

    public getLasPage(): number
    {
        return this.lastPage;
    }

    public getFrom(): number
    {
        if (this.getCurrentPage() > this.lastPage)
        {
            return 0;
        }

        return this.limit === 1 ? this.from + 1 : this.from;
    }

    public getTo(): number
    {
        if (this.getCurrentPage() > this.lastPage)
        {
            return 0;
        }

        return this.limit === 1 ? this.to + 1 : this.to;
    }

    public getPath(): string
    {
        return this.pagination.getPath();
    }

    public getFirstUrl(): string
    {
        const searchValue = `pagination[offset]=${this.offset}`;
        const newValue = 'pagination[offset]=0';

        return this.getCurrentUrl().replace(searchValue, newValue);
    }

    public getLastUrl(): string
    {
        const offset = this.limit * this.lastPage;
        const searchValue = `pagination[offset]=${this.offset}`;
        const newValue = `pagination[offset]=${(this.limit === 1 ? offset - 1 : offset - this.limit)}`;

        return this.getCurrentUrl().replace(searchValue, newValue);
    }

    public getNextUrl(): string | null
    {
        return this.getCurrentPage() < this.lastPage ? this.pagination.getNextUrl() : null;
    }

    public getPrevUrl(): string | null
    {
        if (this.getCurrentPage() > 1)
        {
            const searchValue = `pagination[offset]=${this.offset}`;
            const newValue = `pagination[offset]=${(this.offset - this.limit)}`;

            return this.getCurrentUrl().replace(searchValue, newValue);
        }

        return null;
    }

    public getCurrentUrl(): string
    {
        return this.pagination.getCurrentUrl();
    }

    public getMetadata(): Record<string, any>
    {
        return this.metadata;
    }

    public getOffset(): number
    {
        return this.offset;
    }

    public getLimit(): number
    {
        return this.limit;
    }

    protected setPerPage(perPage: number)
    {
        this.perPage = perPage <= this.limit ? perPage : this.limit;
    }

    protected setCurrentPage()
    {
        this.currentPage = Math.ceil(Math.abs(((this.offset - 1) / this.limit) + 1));
    }

    protected setLasPage()
    {
        this.lastPage = Math.ceil((this.total / this.limit));
    }

    protected setFrom()
    {
        this.from = (this.currentPage * this.limit) - this.limit;
    }

    protected setTo()
    {
        const to = this.currentPage * this.limit;
        this.to =  to >= this.total ? this.total : to;
    }
}
