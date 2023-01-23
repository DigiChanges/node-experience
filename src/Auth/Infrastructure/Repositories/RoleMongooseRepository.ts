import { Query } from 'mongoose';

import IRoleRepository from './IRoleRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';

import Roles from '../../../Config/Roles';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import Role from '../../Domain/Entities/Role';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import RoleOfSystemNotDeletedException from '../../Domain/Exceptions/RoleOfSystemNotDeletedException';
import { RoleMongooseDocument } from '../Schemas/RoleMongoose';

class RoleMongooseRepository extends BaseMongooseRepository<IRoleDomain, RoleMongooseDocument> implements IRoleRepository
{
    constructor()
    {
        super(Role.name);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return this.repository.findOne({ slug });
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<RoleMongooseDocument[], RoleMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(RoleFilter.ENABLE))
        {
            const _enable = filter.get(RoleFilter.ENABLE) as string;
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(RoleFilter.ENABLE).equals(enable);
        }
        if (filter.has(RoleFilter.NAME))
        {
            const name = filter.get(RoleFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(RoleFilter.NAME).regex(rSearch);
        }
        if (filter.has(RoleFilter.SLUG))
        {
            const slug = filter.get(RoleFilter.SLUG) as string;
            const rSearch = new RegExp(slug, 'g');

            void queryBuilder.where(RoleFilter.SLUG).regex(rSearch);
        }

        void queryBuilder.where(RoleFilter.SLUG).ne(Roles.SUPER_ADMIN.toLowerCase());

        return new MongoosePaginator(queryBuilder, criteria);
    }

    override async delete(id: string): Promise<IRoleDomain>
    {
        const isOfSystem = !!(await this.exist({ _id: id, ofSystem: true }, ['_id']));

        if (isOfSystem)
        {
            throw new RoleOfSystemNotDeletedException();
        }

        const entity = await this.repository.findByIdAndDelete({ _id: id } as any);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }
}

export default RoleMongooseRepository;
