import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import Role from '../../Domain/Entities/Role';
import RoleOfSystemNotDeletedException from '../../Domain/Exceptions/RoleOfSystemNotDeletedException';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IRoleRepository from './IRoleRepository';
import BaseMikroSqlRepository from '../../../App/Infrastructure/Repositories/BaseMikroSqlRepository';
import RoleSchema from '../Schemas/RoleMikroORM';
import MikroPaginator from '../../../App/Presentation/Shared/MikroPaginator';

@injectable()
class RoleMikroSqlRepository extends BaseMikroSqlRepository<IRoleDomain> implements IRoleRepository
{
    constructor()
    {
        super('Role', RoleSchema);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return await this.repository.findOne({ slug }) as IRoleDomain;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.em.createQueryBuilder('Role', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(RoleFilter.SLUG))
        {
            void queryBuilder.andWhere(`i.${  RoleFilter.SLUG  } like ?`, [`%${filter.get(RoleFilter.SLUG)}%`]);
        }
        if (filter.has(RoleFilter.NAME))
        {
            void queryBuilder.andWhere(`i.${  RoleFilter.NAME  } like ?`, [`%${filter.get(RoleFilter.NAME)}%`]);
        }

        return new MikroPaginator(queryBuilder, criteria);
    }

    async delete(id: string): Promise<IRoleDomain>
    {
        const isOfSystem = !!(await this.exist({ _id: id, ofSystem: true }, ['_id']));

        if (isOfSystem)
        {
            throw new RoleOfSystemNotDeletedException();
        }

        const entity = await this.repository.findOne(id) as IRoleDomain;

        if (!entity)
        {
            throw new NotFoundException(Role.name);
        }

        await this.repository.removeAndFlush(entity);

        return entity;
    }
}

export default RoleMikroSqlRepository;
