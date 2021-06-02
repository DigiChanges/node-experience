import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';
import Role from '../../Domain/Entities/Role';
import RoleSchema from '../Schema/RoleTypeORM';

@injectable()
class RoleSqlRepository extends BaseSqlRepository<IRoleDomain> implements IRoleRepository
{
    constructor()
    {
        super(Role.name, RoleSchema);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return await this.repository.findOne({slug});
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
}

export default RoleSqlRepository;
