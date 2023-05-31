import { Aggregate } from 'mongoose';
import IPaginator from './IPaginator';
import IPaginatorConfig from './IPaginatorConfig';
import ICriteria from '../../Presentation/Requests/ICriteria';
import BasePaginator from './BasePaginator';

class MongooseAggregatePaginator extends BasePaginator implements IPaginator
{
    private aggregate: Aggregate<any[]>;

    constructor(aggregate: Aggregate<any[]>, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.aggregate = aggregate;
    }

    public async paginate(): Promise<any>
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
