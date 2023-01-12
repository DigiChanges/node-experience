import IRoleRepository from './IRoleRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import TypeORMPaginator from '../../../Shared/Infrastructure/Orm/TypeORMPaginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import BaseTypeORMRepository from '../../../Shared/Infrastructure/Repositories/BaseTypeORMRepository';
import Role from '../../Domain/Entities/Role';
import RoleSchema from '../Schemas/RoleTypeORM';
import RoleOfSystemNotDeletedException from '../../Domain/Exceptions/RoleOfSystemNotDeletedException';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import Roles from '../../../Config/Roles';

class RoleTypeORMRepository extends BaseTypeORMRepository<IRoleDomain> implements IRoleRepository
{
    constructor()
    {
        super(Role.name, RoleSchema);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return await this.repository.findOneBy({ slug });
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(RoleFilter.ENABLE))
        {
            const _enable = filter.get(RoleFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            queryBuilder.andWhere(`i.${RoleFilter.ENABLE} = :${RoleFilter.ENABLE}`);
            queryBuilder.setParameter(RoleFilter.ENABLE, enable);
        }

        if (filter.has(RoleFilter.NAME))
        {
            const name = filter.get(RoleFilter.NAME);

            queryBuilder.andWhere(`i.${RoleFilter.NAME} ilike :${RoleFilter.NAME}`);
            queryBuilder.setParameter(RoleFilter.NAME, `%${name}%`);
        }

        if (filter.has(RoleFilter.SLUG))
        {
            const slug = filter.get(RoleFilter.SLUG);

            queryBuilder.andWhere(`i.${RoleFilter.SLUG} ilike :${RoleFilter.SLUG}`);
            queryBuilder.setParameter(RoleFilter.SLUG, `%${slug}%`);
        }

        queryBuilder.andWhere(`i.${RoleFilter.SLUG} != '${Roles.SUPER_ADMIN.toLowerCase()}'`);

        return new TypeORMPaginator(queryBuilder, criteria);
    }

    override async delete(id: string): Promise<IRoleDomain>
    {
        const isOfSystem = !!(await this.exist({ _id: id, ofSystem: true }, ['_id']));

        if (isOfSystem)
        {
            throw new RoleOfSystemNotDeletedException();
        }

        const entity = await this.repository.findOneById(id);

        if (!entity)
        {
            throw new NotFoundException(Role.name);
        }

        await this.repository.delete(id);

        return entity;
    }
}

export default RoleTypeORMRepository;
