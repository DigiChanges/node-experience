import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import Base from '../../../App/Domain/Entities/Base';

class User extends Base implements IUserDomain
{
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    document_type: string;
    document_number: string;
    gender: string;
    phone: string;
    country: string;
    address: string;
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    is_super_admin: boolean;
    confirmation_token: string;
    password_requested_at: Date;

    get_full_name(): string
    {
        return `${this.first_name} ${this.last_name}`;
    }

    clear_roles(): void
    {
        this.roles = [];
    }

    set_role(role: IRoleDomain): void
    {
        const find = this.roles.find((_role) => _role.get_id().toString() === role.get_id().toString());

        if (!find)
        {
            this.roles.push(role);
        }
    }

    get_roles(): IRoleDomain[]
    {
        return this.roles;
    }
}

export default User;
