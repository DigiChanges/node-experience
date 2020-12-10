import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import {injectable} from "inversify";

import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import RoleFilter from "../../Presentation/Criterias/Role/RoleFilter";
import {Query, Model} from "mongoose";
import IRole from "../../InterfaceAdapters/IEntities/Mongoose/IRoleDocument";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import {connection} from "../Database/MongooseCreateConnection";

import NotFoundException from "../Exceptions/NotFoundException";

@injectable()
class RoleMongoRepository implements IRoleRepository
{
     private repository: Model<IRole>;

    constructor()
    {
        this.repository = connection.model<IRole>('Role');
    }

    async save (role: IRoleDomain): Promise<IRoleDomain>
    {
        return await this.repository.create(role);
    }

    async getOne(id: string): Promise<IRoleDomain>
    {
        const role = await this.repository.findOne({_id: id});

        if (!role)
        {
            throw new NotFoundException('Role');
        }

        return role;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IRole[], IRole> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(RoleFilter.ENABLE))
        {
            const _enable = filter.get(RoleFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            queryBuilder.where(RoleFilter.ENABLE).equals(enable);
        }
        if (filter.has(RoleFilter.NAME))
        {
            const name = filter.get(RoleFilter.NAME);
            const rsearch = new RegExp(name, "g");

            queryBuilder.where(RoleFilter.NAME).regex(rsearch);
        }
        if (filter.has(RoleFilter.SLUG))
        {
            const slug = filter.get(RoleFilter.SLUG);
            const rsearch = new RegExp(slug, "g");

            queryBuilder.where(RoleFilter.SLUG).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(role: IRoleDomain): Promise<IRoleDomain>
    {
        return this.repository.updateOne({_id: role.getId()}, role);
    }

    async delete(id: string): Promise<IRoleDomain>
    {
        const item = await this.repository.findByIdAndDelete({_id: id});

        if (!item)
        {
            throw new NotFoundException('Role');
        }

        return item;
    }
}

export default RoleMongoRepository;
