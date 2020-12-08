import UserRepoFactory from "../Factories/UserRepoFactory";
import RoleRepoFactory from "../Factories/RoleRepoFactory";
import ItemRepoFactory from "../Factories/ItemRepoFactory";
import EncryptionFactory from "../Factories/EncryptionFactory";

import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";
import IEncryption from "../../InterfaceAdapters/Shared/IEncryption";

import Role from "../../Domain/Entities/Role";
import User from "../../Domain/Entities/User";

import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

class SeedFactory
{
    private userRepo: IUserRepository;
    private roleRepo: IRoleRepository;
    private itemRepo: IItemRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.userRepo = UserRepoFactory.create();
        this.roleRepo = RoleRepoFactory.create();
        this.itemRepo = ItemRepoFactory.create();
        this.encryption = EncryptionFactory.create();
    }

    public async init()
    {
        const role: IRoleDomain = new Role();
        role.name = 'SuperAdmin';
        role.slug = 'superadmin';
        role.permissions = [];
        role.enable = true;

        await this.roleRepo.save(role);

        let user: IUserDomain = new User();
        user.firstName = 'Super';
        user.lastName = 'Admin';
        user.email = 'user@node.com';
        user.password = await this.encryption.encrypt('12345678');
        user.enable = true;
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.permissions = [];
        user.roles = [role];
        user.isSuperAdmin = true;

        await this.userRepo.save(user);
    }
}

export default SeedFactory;