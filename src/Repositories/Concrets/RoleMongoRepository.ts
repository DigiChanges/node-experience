import IRoleRepository from "../Contracts/IRoleRepository";
import {DeleteResult, getMongoRepository, MongoRepository} from "typeorm";
import Role from "../../Entities/Role";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Lib/StatusCode";
import MongoPaginator from "../../Lib/MongoPaginator";
import IPaginator from "../../Lib/Contracts/IPaginator";
import ICriteria from "../../Lib/Contracts/ICriteria";
import RoleFilter from "../../Api/Libs/Criterias/Role/RoleFilter";

@injectable()
class RoleMongoRepository implements IRoleRepository {
    private repository: MongoRepository<Role>;

    constructor() {
        this.repository = getMongoRepository(Role);
    }

    async save (role: Role): Promise<Role> {
        return await this.repository.save(role);
    }

    async findOne(id: string): Promise<Role>
    {
        const role = await this.repository.findOne(id);

        if (!role) {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Role Not Found');
        }

        return role;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const count = await this.repository.count();
        let cursor = await this.repository.createCursor();
        const filter = criteria.getFilter();
        let filters = {};

        if (filter.has(RoleFilter.ENABLE))
        {
            let _enable = filter.get(RoleFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            Object.assign(filters, {enable: { $eq : enable }});
        }
        if (filter.has(RoleFilter.NAME)) {
            let name = filter.get(RoleFilter.NAME);

            Object.assign(filters, {name: { $regex: name }});
        }
        if (filter.has(RoleFilter.SLUG)) {
            let slug = filter.get(RoleFilter.SLUG);

            Object.assign(filters, {slug: { $regex: slug }});
        }
        if (Object.entries(filters))
        {
            cursor.filter(filters);
        }

        const paginator = new MongoPaginator(cursor, criteria, count);

        return await paginator;
    }

    async update(role: Role): Promise<any> {
        this.repository.save(role);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async exists(ids: string[]): Promise<boolean>
    {
        let exist: boolean  = true;

        const count = ids.length;

        for (let i = 0; i < count; i++)
        {
            const role = await this.repository.findOne(ids[i]);

            if (!role)
            {
                exist = false;
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Role Not Found: ' + ids[i]);
            }
        }

        return exist;
    }
}

export default RoleMongoRepository;