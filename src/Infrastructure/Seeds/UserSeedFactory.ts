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

        const roleOperator: IRoleDomain = new Role();
        roleOperator.name = 'Operator';
        roleOperator.slug = 'operator';
        roleOperator.permissions = [];
        roleOperator.enable = true;

        await this.roleRepo.save(roleOperator);

        const roleOperatorDisabled: IRoleDomain = new Role();
        roleOperatorDisabled.name = 'OperatorDisabled';
        roleOperatorDisabled.slug = 'operatordisabled';
        roleOperatorDisabled.permissions = [];
        roleOperatorDisabled.enable = false;

        await this.roleRepo.save(roleOperatorDisabled);

        let userSuperAdmin: IUserDomain = new User();
        userSuperAdmin.firstName = 'Super';
        userSuperAdmin.lastName = 'Admin';
        userSuperAdmin.email = 'superadmin@node.com';
        userSuperAdmin.password = await this.encryption.encrypt('12345678');
        userSuperAdmin.enable = true;
        userSuperAdmin.confirmationToken = null;
        userSuperAdmin.passwordRequestedAt = null;
        userSuperAdmin.permissions = [];
        userSuperAdmin.roles = [roleSuperAdmin];
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
        userAdmin.roles = [roleAdmin];
        userAdmin.isSuperAdmin = false;

        await this.userRepo.save(userAdmin);

        let userOperator: IUserDomain = new User();
        userOperator.firstName = 'operator';
        userOperator.lastName = 'enable';
        userOperator.email = 'operator@enable.com';
        userOperator.password = await this.encryption.encrypt('123456789');
        userOperator.enable = true;
        userOperator.confirmationToken = null;
        userOperator.passwordRequestedAt = null;
        userOperator.permissions = [];
        userOperator.roles = [roleOperator];
        userOperator.isSuperAdmin = false;

        await this.userRepo.save(userOperator);

        let userOperatorDisabled: IUserDomain = new User();
        userOperatorDisabled.firstName = 'operator';
        userOperatorDisabled.lastName = 'disabled';
        userOperatorDisabled.email = 'operator@disabled.com';
        userOperatorDisabled.password = await this.encryption.encrypt('1234567901');
        userOperatorDisabled.enable = false;
        userOperatorDisabled.confirmationToken = null;
        userOperatorDisabled.passwordRequestedAt = null;
        userOperatorDisabled.permissions = [];
        userOperatorDisabled.roles = [roleOperator];
        userOperatorDisabled.isSuperAdmin = false;

        await this.userRepo.save(userOperatorDisabled);

        let userOperatorRoleDisabled: IUserDomain = new User();
        userOperatorRoleDisabled.firstName = 'operator';
        userOperatorRoleDisabled.lastName = 'roleDisabled';
        userOperatorRoleDisabled.email = 'operator@roleDisabled.com';
        userOperatorRoleDisabled.password = await this.encryption.encrypt('123456790');
        userOperatorRoleDisabled.enable = true;
        userOperatorRoleDisabled.confirmationToken = null;
        userOperatorRoleDisabled.passwordRequestedAt = null;
        userOperatorRoleDisabled.permissions = [];
        userOperatorRoleDisabled.roles = [roleOperatorDisabled];
        userOperatorRoleDisabled.isSuperAdmin = false;

        await this.userRepo.save(userOperatorRoleDisabled);
    }
}

export default UserSeedFactory;