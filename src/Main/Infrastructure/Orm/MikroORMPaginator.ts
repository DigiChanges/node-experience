import { QueryBuilder } from '@mikro-orm/postgresql';
import { BasePaginator, IPaginatorConfig } from '../Criteria';
import { ICriteria } from '../../Domain/Criteria';
import { IPaginator } from '../../Domain/Criteria/IPaginator';

class MikroORMPaginator extends BasePaginator implements IPaginator
{
    private queryBuilder: QueryBuilder;

    constructor(queryBuilder: QueryBuilder, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.queryBuilder = queryBuilder;
    }

    public async paginate(): Promise<any>
    {
        this.total = await this.queryBuilder.getCount();
        this.addOrderBy();
        this.addPagination();

        let data = await this.queryBuilder.getResultList();
        this._perPage = await this.queryBuilder.getCount();
        this.setPerPage(this._perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        if (this.helper)
        {
            data = await this.helper(data);
        }

        return data;
    }

    private addOrderBy()
    {
        const sorts = this.sort.get();

        sorts.forEach((value: string, key: string) =>
        {
            let order = value.toLowerCase();
            order = (order === 'desc') ? 'desc' : 'asc';

            void this.queryBuilder.orderBy({ [key]: order });
        });
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.queryBuilder
                .offset(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}

export default MikroORMPaginator;
