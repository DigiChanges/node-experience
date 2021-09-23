import { Query } from 'mongoose';
import { ICriteria, IFilter, IPagination, IPaginator, ISort } from '@digichanges/shared-experience';
import IPaginatorConfig from '../../../Shared/InterfaceAdapters/IPaginatorConfig';

class MongoPaginator implements IPaginator
{
    private documentQuery: Query<any[], any>;
    private filter: IFilter;
    private sort: ISort;
    private pagination: IPagination;

    private readonly limit: number;
    private readonly offset: number;

    private total: number;
    private _perPage: number;
    private perPage: number;

    private currentPage: number;
    private lastPage: number;
    private from: number;
    private to: number;

    private readonly metadata: Record<string, any>;
    private readonly helper: (data: any) => Promise<any>;

    constructor(documentQuery: Query<any[], any>, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: null })
    {
        this.documentQuery = documentQuery;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
        this.offset = this.pagination.getOffset();
        this.limit = this.pagination.getLimit();
        this.metadata = config?.metadata ?? {};
        this.helper = config?.helper ?? null;
    }

    public async paginate(): Promise<any>
    {
        this.total = await ((this.documentQuery as any).clone()).count();

        this.addOrderBy();
        this.addPagination();

        this._perPage = await ((this.documentQuery as any).clone()).count();
        this.setPerPage(this._perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        let data = await this.documentQuery.find().exec();

        if (this.helper)
        {
            data = await this.helper(data);
        }

        return data;
    }

    // TODO: See when multiple sorts
    private addOrderBy()
    {
        const sorts = this.sort.get();
        const _objectSort = {};

        sorts.forEach((value: string, key: string) =>
        {
            let order: any = value.toUpperCase();
            order = (order === 'DESC') ? -1 : 1;

            const obj = { [key]: order };
            Object.assign(_objectSort, obj);
        });

        void this.documentQuery.sort(_objectSort);
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.documentQuery
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }

    private setPerPage(perPage: number)
    {
        this.perPage = perPage <= this.limit ? perPage : this.limit;
    }

    private setCurrentPage()
    {
        this.currentPage = Math.ceil(Math.abs(((this.offset - 1) / this.limit) + 1));
    }

    private setLasPage()
    {
        this.lastPage = Math.ceil((this.total / this.limit));
    }

    private setFrom()
    {
        this.from = (this.currentPage * this.limit) - this.limit;
    }

    private setTo()
    {
        const to = this.currentPage * this.limit;
        this.to =  to >= this.total ? this.total : to;
    }

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

    public getNextUrl(): string
    {
        return this.getCurrentPage() < this.lastPage ? this.pagination.getNextUrl() : null;
    }

    public getPrevUrl(): string
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
}

export default MongoPaginator;
