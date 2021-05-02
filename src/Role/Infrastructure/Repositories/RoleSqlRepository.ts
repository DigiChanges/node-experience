import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {DeleteResult, getRepository, Repository} from 'typeorm';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import RoleSchema from '../Schema/RoleTypeORM';
import Role from '../../Domain/Entities/Role';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';

@injectable()
class RoleSqlRepository implements IRoleRepository
{
    private repository: Repository<Role>;

    constructor()
    {
        this.repository = getRepository<Role>(RoleSchema);
    }

    async save(role: IRoleDomain): Promise<Role>
    {
        return await this.repository.save(role);
    }

    async getOne(id: string): Promise<Role>
    {
        const role = await this.repository.findOne(id);

        if (!role)
        {
            throw new NotFoundException('Role');
        }

        return role;
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

    async update(role: IRoleDomain): Promise<any>
    {
        await this.repository.save(role);
    }

    async delete(id: any): Promise<any>
    {
        return await this.repository.delete(id);
    }

}

export default RoleSqlRepository;
