import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import RoleFilter from '../../Presentation/Criterias/RoleFilter';
import {Query} from 'mongoose';
import IRole from '../../InterfaceAdapters/IRoleDocument';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';
import Role from '../../Domain/Entities/Role';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import RoleOfSystemNotDeletedException from '../../Domain/Exceptions/RoleOfSystemNotDeletedException';
import SuperAdminRole from '../../../App/Domain/Shared/SuperAdminRole';

@injectable()
class RoleMongoRepository extends BaseMongoRepository<IRoleDomain, IRole> implements IRoleRepository
{
    constructor()
    {
        super(Role.name);
    }

    async getBySlug(slug: string): Promise<IRoleDomain>
    {
        return this.repository.findOne({slug});
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IRole[], IRole> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(RoleFilter.ENABLE))
        {
            const _enable = filter.get(RoleFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(RoleFilter.ENABLE).equals(enable);
        }
        if (filter.has(RoleFilter.NAME))
        {
            const name = filter.get(RoleFilter.NAME);
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(RoleFilter.NAME).regex(rsearch);
        }
        if (filter.has(RoleFilter.SLUG))
        {
            const slug = filter.get(RoleFilter.SLUG);
            const rsearch = new RegExp(slug, 'g');

            void queryBuilder.where(RoleFilter.SLUG).regex(rsearch);
        }

        void queryBuilder.where(RoleFilter.SLUG).ne(SuperAdminRole.I.NAME.toLowerCase());

        return new MongoPaginator(queryBuilder, criteria);
    }

    async delete(id: string): Promise<IRoleDomain>
    {
        const isOfSystem = !!(await this.exist({_id: id, ofSystem: true}, ['_id']));

        if (isOfSystem)
        {
            throw new RoleOfSystemNotDeletedException();
        }

        const entity = await this.repository.findByIdAndDelete({_id: id} as any);

        if (!entity)
        {
            throw new NotFoundException(Role.name);
        }

        return entity;
    }
}

export default RoleMongoRepository;
