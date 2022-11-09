import { SelectQueryBuilder } from 'typeorm';
import IPaginatorConfig from './IPaginatorConfig';
import IPaginator from './IPaginator';
import ICriteria from '../../Presentation/Requests/ICriteria';
import BasePaginator from './BasePaginator';

class TypeORMPaginator extends BasePaginator implements IPaginator
{
    private readonly queryBuilder: SelectQueryBuilder<any>;

    constructor(queryBuilder: SelectQueryBuilder<any>, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.queryBuilder = queryBuilder;
    }

    public async paginate(): Promise<any>
    {
        this.total = await this.queryBuilder.getCount();

        this.addOrderBy();
        this.addPagination();

        this._perPage = await this.queryBuilder.getCount();
        this.setPerPage(this._perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        let data = await this.queryBuilder.getMany();

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
            let order = value.toUpperCase();
            order = (order === 'DESC') ? 'DESC' : 'ASC';

            const { alias } = this.queryBuilder;
            this.queryBuilder.addOrderBy(`${alias}.${key}`, order as any);
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

export default TypeORMPaginator;
