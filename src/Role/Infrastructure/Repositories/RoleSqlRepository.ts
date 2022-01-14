import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';
import Role from '../../Domain/Entities/Role';
import RoleSchema from '../Schemas/RoleTypeORM';
import RoleOfSystemNotDeletedException from '../../Domain/Exceptions/RoleOfSystemNotDeletedException';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import Roles from '../../../Config/Roles';

@injectable()
class RoleSqlRepository extends BaseSqlRepository<IRoleDomain> implements IRoleRepository
{
    constructor()
    {
        super(Role.name, RoleSchema);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return await this.repository.findOne({ slug });
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

        return new Paginator(queryBuilder, criteria);
    }

    async delete(id: string): Promise<IRoleDomain>
    {
        const isOfSystem = !!(await this.exist({ _id: id, ofSystem: true }, ['_id']));

        if (isOfSystem)
        {
            throw new RoleOfSystemNotDeletedException();
        }

        const entity = await this.repository.findOne(id);

        if (!entity)
        {
            throw new NotFoundException(Role.name);
        }

        await this.repository.delete(id);

        return entity;
    }
}

export default RoleSqlRepository;
