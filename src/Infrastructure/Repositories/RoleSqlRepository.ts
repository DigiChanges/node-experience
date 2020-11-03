import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import {injectable} from "inversify";

import Paginator from "../../Presentation/Shared/Paginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import RoleFilter from "../../Presentation/Criterias/Role/RoleFilter";
import RoleSchema from "../Schema/TypeORM/Role";
import Role from "../../Domain/Entities/Role";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import NotFoundException from "../Exceptions/NotFoundException";

@injectable()
class RoleSqlRepository implements IRoleRepository
{
    private repository: Repository<Role>;

    constructor()
    {
        this.repository = getRepository<Role>(RoleSchema);
    }

    async save (role: IRoleDomain ): Promise<Role>
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

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        if (filter.has(RoleFilter.NAME))
        {
            queryBuilder.andWhere("i." + RoleFilter.NAME + " like :" + RoleFilter.NAME);
            queryBuilder.setParameter(RoleFilter.NAME, '%' + filter.get(RoleFilter.NAME) + '%');
        }

        return new Paginator(queryBuilder, criteria);
    }

    async update(role: IRoleDomain): Promise<any>
    {
        await this.repository.save(role);
    }

    async delete(id: any): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

}

export default RoleSqlRepository;
