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

        if (filter.has(RoleFilter.NAME))
        {
            queryBuilder.andWhere(`i.${  RoleFilter.NAME  } like :${  RoleFilter.NAME}`);
            queryBuilder.setParameter(RoleFilter.NAME, `%${filter.get(RoleFilter.NAME)}%`);
        }

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
