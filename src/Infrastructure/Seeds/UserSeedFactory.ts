import faker from "faker";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import Role from "../../Domain/Entities/Role";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import User from "../../Domain/Entities/User";
import UserRepoFactory from "../Factories/UserRepoFactory";
import RoleRepoFactory from "../Factories/RoleRepoFactory";
import EncryptionFactory from "../Factories/EncryptionFactory";
import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import IEncryption from "../../InterfaceAdapters/Shared/IEncryption";

class UserSeedFactory
{
    private userRepo: IUserRepository;
    private roleRepo: IRoleRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.userRepo = UserRepoFactory.create();
        this.roleRepo = RoleRepoFactory.create();
        this.encryption = EncryptionFactory.create();
    }

    public async authInit()
    {
        const roleSuperAdmin: IRoleDomain = new Role();
        roleSuperAdmin.name = 'SuperAdmin';
        roleSuperAdmin.slug = 'superadmin';
        roleSuperAdmin.permissions = [];
        roleSuperAdmin.enable = true;

        await this.roleRepo.save(roleSuperAdmin);

        const roleAdmin: IRoleDomain = new Role();
        roleAdmin.name = 'Admin';
        roleAdmin.slug = 'admin';
        roleAdmin.permissions = [];
        roleAdmin.enable = true;

        await this.roleRepo.save(roleAdmin);

        let userSuperAdmin: IUserDomain = new User();
        userSuperAdmin.firstName = 'Super';
        userSuperAdmin.lastName = 'Admin';
        userSuperAdmin.email = 'superadmin@node.com';
        userSuperAdmin.password = await this.encryption.encrypt('12345678');
        userSuperAdmin.enable = true;
        userSuperAdmin.confirmationToken = null;
        userSuperAdmin.passwordRequestedAt = null;
        userSuperAdmin.permissions = [];
        userSuperAdmin.roles = [roleAdmin];
        userSuperAdmin.isSuperAdmin = true;

        await this.userRepo.save(userSuperAdmin);

        let userAdmin: IUserDomain = new User();
        userAdmin.firstName = 'user';
        userAdmin.lastName = 'node';
        userAdmin.email = 'user@node.com';
        userAdmin.password = await this.encryption.encrypt('12345678');
        userAdmin.enable = true;
        userAdmin.confirmationToken = null;
        userAdmin.passwordRequestedAt = null;
        userAdmin.permissions = [];
        userAdmin.roles = [roleSuperAdmin];
        userAdmin.isSuperAdmin = false;

        await this.userRepo.save(userAdmin);
    }
}

export default UserSeedFactory;