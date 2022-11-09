import { Query } from 'mongoose';
import IPaginator from './IPaginator';
import IPaginatorConfig from './IPaginatorConfig';
import ICriteria from '../../Presentation/Requests/ICriteria';
import BasePaginator from './BasePaginator';

class MongoosePaginator extends BasePaginator implements IPaginator
{
    private documentQuery: Query<any[], any>;

    constructor(documentQuery: Query<any[], any>, criteria: ICriteria, config: IPaginatorConfig = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.documentQuery = documentQuery;
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
}

export default MongoosePaginator;
