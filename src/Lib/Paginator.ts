import IPaginator from "./Contracts/IPaginator";
import {SelectQueryBuilder} from "typeorm";
import ICriteria from "./Contracts/ICriteria";
import IFilter from "./Contracts/IFilter";
import ISort from "./Contracts/ISort";
import IPagination from "./Contracts/IPagination";

class Paginator implements IPaginator
{
    private queryBuilder: SelectQueryBuilder<any>;
    private filter: IFilter;
    private sort: ISort;
    private pagination: IPagination;

    constructor(queryBuilder: SelectQueryBuilder<any>, criteria: ICriteria)
    {
        this.queryBuilder = queryBuilder;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
    }

    public getTotal(): number
    {
        return 0;
    }

    public getCount(): number
    {
        return 0;
    }

    public getCurrentUrl(): string {
        return this.pagination.getCurrentUrl();
    }

    public getNextUrl(): string {
        return this.pagination.getNextUrl();
    }

    public async paginate(): Promise<any>
    {
        const data = await this.queryBuilder
            .skip(this.pagination.getOffset())
            .take(this.pagination.getLimit())
            .getMany();

        return data;
    }
}

export default Paginator;
