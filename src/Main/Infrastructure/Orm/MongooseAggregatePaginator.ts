import { Aggregate } from 'mongoose';
import { BasePaginator, IPaginatorConfig } from '../Criteria';
import { ICriteria } from '../../Domain/Criteria';
import { IPaginator } from '../../Domain/Criteria/IPaginator';

class MongooseAggregatePaginator extends BasePaginator implements IPaginator
{
    private aggregate: Aggregate<unknown[]>;

    constructor(aggregate: Aggregate<unknown[]>, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.aggregate = aggregate;
    }

    public async paginate<T>(): Promise<T[]>
    {
        this.addOrderBy();
        this.addPagination();

        this.setPerPage(this._perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        let data = await this.aggregate.exec();
        this.total = data.length;
        this._perPage = data.length;

        if (this.helper)
        {
            data = await this.helper(data);
        }

        return data as T[];
    }

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

        void this.aggregate.sort(_objectSort);
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.aggregate
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}

export default MongooseAggregatePaginator;
