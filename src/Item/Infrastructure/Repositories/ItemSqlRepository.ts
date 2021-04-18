import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {getRepository, Repository} from 'typeorm';
import Item from '../../Domain/Entities/Item';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import ItemSchema from '../Schema/ItemTypeORM';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import NotFoundException from '../../../App/Infrastructure/Exceptions/NotFoundException';

@injectable()
class ItemSqlRepository implements IItemRepository
{
    private repository: Repository<Item>;

    constructor()
    {
        this.repository = getRepository<Item>(ItemSchema);
    }

    async save(item: IItemDomain): Promise<Item>
    {
        return await this.repository.save(item);
    }

    async getOne(id: string): Promise<Item>
    {
        const item = await this.repository.findOne(id);

        if (!item)
        {
            throw new NotFoundException('Item');
        }

        return item;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(ItemFilter.TYPE))
        {
            queryBuilder.andWhere(`i.${  ItemFilter.TYPE  } = :${  ItemFilter.TYPE}`);
            queryBuilder.setParameter(ItemFilter.TYPE, filter.get(ItemFilter.TYPE));
        }
        if (filter.has(ItemFilter.NAME))
        {
            queryBuilder.andWhere(`i.${  ItemFilter.NAME  } like :${  ItemFilter.NAME}`);
            queryBuilder.setParameter(ItemFilter.NAME, `%${filter.get(ItemFilter.NAME)}%`);
        }

        return new Paginator(queryBuilder, criteria);
    }

    async update(item: IItemDomain): Promise<any>
    {
        await this.repository.save(item);
    }

    async delete(id: any): Promise<any>
    {
        return await this.repository.delete(id);
    }
}

export default ItemSqlRepository;
