import IRoleDomain from '../../Role/InterfaceAdapters/IRoleDomain';
import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';

interface IUserDomain extends IBaseDomain
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

    get_full_name(): string;
    set_role(role: IRoleDomain): void;
    get_roles(): IRoleDomain[];
    clear_roles(): void;
}

export default IUserDomain;
