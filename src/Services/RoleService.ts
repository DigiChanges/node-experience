import Role from '../Entities/Role';
import {inject, injectable} from 'inversify';
import IdPayload from "../Payloads/Defaults/IdPayload";
import RoleRepPayload from "../Payloads/Roles/RoleRepPayload";
import RoleUpdatePayload from "../Payloads/Roles/RoleUpdatePayload";
import {REPOSITORIES} from "../repositories";
import IRoleRepository from "../Repositories/Contracts/IRoleRepository";
import ICriteria from "../Lib/Contracts/ICriteria";
import IEncription from "../Lib/Encription/IEncription";
import {TYPES} from "../types";

@injectable()
class RoleService
{
    private repository: IRoleRepository;
    private encryption: IEncription;

    constructor(@inject(REPOSITORIES.IRoleRepository) repository: IRoleRepository,
                @inject(TYPES.IEncription) encryption: IEncription)
    {
        this.repository = repository;
        this.encryption = encryption;
    }

    public async save (payload: RoleRepPayload): Promise<Role>
    {
        const role = new Role();
        role.name = payload.name();
        role.slug = payload.slug();
        role.permissions = payload.permissions();
        role.enable = payload.enable();

        await this.repository.save(role);

        return role;
    }

    public async update (payload: RoleUpdatePayload): Promise<Role>
    {
        const id = payload.id();
        let role = await this.repository.findOne(id);

        role.name = payload.name();
        role.slug = payload.slug();
        role.permissions = payload.permissions();
        role.enable = payload.enable();

        await this.repository.save(role);

        return role;
    }

    public async list (criteria: ICriteria)
    {
        return await this.repository.list(criteria);
    }

    public async getOne (payload: IdPayload): Promise<Role>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }

    public async remove (payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        return await this.repository.delete(id);
    }
}

export default RoleService;