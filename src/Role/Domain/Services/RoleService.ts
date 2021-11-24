import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import Role from '../Entities/Role';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import UniqueService from '../../../App/Domain/Services/UniqueService';
import AuthService from '../../../Auth/Domain/Services/AuthService';

class RoleService
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    private authService = new AuthService();

    async persist(role: IRoleDomain, payload: RoleRepPayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        void await UniqueService.validate<IRoleDomain>({
            repository: REPOSITORIES.IRoleRepository,
            validate: {
                slug: payload.getSlug()
            },
            refValue: role.getId()
        });

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.enable = payload.getEnable();
        role.permissions = payload.getPermissions();

        return await this.repository.save(role);
    }

    async create(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        const role = new Role();

        void await UniqueService.validate<IRoleDomain>({
            repository: REPOSITORIES.IRoleRepository,
            validate: {
                slug: payload.getSlug()
            }
        });

        return await this.persist(role, payload);
    }

    async update(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        const role: IRoleDomain = await this.getOne(id);
        return await this.persist(role, payload);
    }

    async getOne(id: string): Promise<IRoleDomain>
    {
        return await this.repository.getOne(id);
    }

    async remove(id: string): Promise<IRoleDomain>
    {
        return await this.repository.delete(id);
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default RoleService;
