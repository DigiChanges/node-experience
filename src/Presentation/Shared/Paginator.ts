import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import {SelectQueryBuilder} from "typeorm";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import IFilter from "../../InterfaceAdapters/Shared/IFilter";
import ISort from "../../InterfaceAdapters/Shared/ISort";
import IPagination from "../../InterfaceAdapters/Shared/IPagination";

class Paginator implements IPaginator
{
    private queryBuilder: SelectQueryBuilder<any>;
    private filter: IFilter;
    private sort: ISort;
    private pagination: IPagination;
    private count: number;

    constructor(queryBuilder: SelectQueryBuilder<any>, criteria: ICriteria)
    {
        this.queryBuilder = queryBuilder;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
    }

    public getTotal(): number
    {
        const offset = this.pagination.getOffset();
        const limit = this.pagination.getLimit();

        const total = this.count - offset;

        return total<=limit ? total : limit;
    }

    public getCount(): number
    {
        return this.count;
    }

    public getCurrentUrl(): string {
        return this.pagination.getCurrentUrl();
    }

    // TODO: Dont show next url when it doesnt exist more data
    public getNextUrl(): string {
        return this.pagination.getNextUrl();
    }

    public async paginate(): Promise<any>
    {
        // TODO: Add filter logic

        this.addOrderBy();
        this.addPagination();

        const data = await this.queryBuilder.getMany();
        this.count = await this.queryBuilder.getCount();

        return data;
    }

    public getExist(): boolean
    {
        return this.pagination.getExist();
    }

    private addOrderBy()
    {
        let sorts = this.sort.get();

        sorts.forEach((value: string, key: string ) => {
            let order: string = value.toUpperCase();
            order = (order === 'DESC') ? "DESC" : "ASC";

            // @ts-ignore
            this.queryBuilder.addOrderBy(key, order);
        });
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            this.queryBuilder
                .skip(this.pagination.getOffset())
                .take(this.pagination.getLimit());
        }
    }
}

export default Paginator;
