import IPaginator from "./Contracts/IPaginator";
import {Cursor} from "typeorm";
import ICriteria from "./Contracts/ICriteria";
import IFilter from "./Contracts/IFilter";
import ISort from "./Contracts/ISort";
import IPagination from "./Contracts/IPagination";

class MongoPaginator implements IPaginator
{
    private cursor: Cursor<any>;
    private filter: IFilter;
    private sort: ISort;
    private pagination: IPagination;
    private count: number;
    private total: number;

    constructor(cursor: Cursor<any>, criteria: ICriteria, count: number)
    {
        this.cursor = cursor;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
        this.count = count;
    }

    public getTotal(): number
    {
        return this.total;
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

        const data = await this.cursor.toArray();
        this.total = data.length;

        return data;
    }

    public getExist(): boolean
    {
        return this.pagination.getExist();
    }
    // TODO: See when multiple sorts
    private addOrderBy()
    {
        let sorts = this.sort.get();

        sorts.forEach((value: string, key: string ) => {
            let order: any = value.toUpperCase();
            order = (order === 'DESC') ? -1 : 1;

            const obj = {[key]: order};

            this.cursor.sort(obj);
        });
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            this.cursor
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}

export default MongoPaginator;
