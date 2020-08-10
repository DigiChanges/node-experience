import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import RoleFilter from "../../Presentation/Criterias/Role/RoleFilter";
import {Model} from "mongoose";
import IRole from "../../InterfaceAdapters/IEntities/Mongoose/IRoleDocument";
import RoleSchema from "../Schema/Role";
import {ObjectID} from "mongodb";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import {connection} from "../Database/MongooseCreateConnection";

@injectable()
class RoleMongoRepository implements IRoleRepository
{
     private repository: Model<IRole>;

    constructor()
    {
        this.repository = connection.model<IRole>('Role', RoleSchema);
    }

    async save (role: IRoleDomain): Promise<IRole>
    {
        return await this.repository.create(role);
    }

    async getOne(id: ObjectID): Promise<IRole>
    {
        const role = await this.repository.findOne(id);

        if (!role)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Role Not Found');
        }

        return role;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        // @ts-ignore
        const count = await this.repository.count();
        let aggregationCursor = await this.repository.aggregate([]);
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
            // @ts-ignore
            aggregationCursor.match(filters);
        }

        // @ts-ignore
        return new MongoPaginator(aggregationCursor, criteria, count);
    }

    async update(role: IRoleDomain): Promise<any>
    {
        // @ts-ignore
        await this.repository.save(role);
    }

    async delete(id: ObjectID): Promise<any>
    {
        // @ts-ignore
        return await this.repository.delete(id);
    }

    async exists(ids: ObjectID[]): Promise<boolean>
    {
        let exist: boolean  = true;

        const count = ids.length;

        for (let i = 0; i < count; i++)
        {
            // @ts-ignore
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