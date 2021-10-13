import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';

interface UserRepPayload
{
    get_first_name(): string;
    get_last_name(): string;
    get_email(): string;
    get_birthday(): string;
    get_document_type(): string;
    get_document_number(): string;
    get_gender(): string;
    get_phone(): string;
    get_country(): string;
    get_address(): string;
    get_enable(): boolean;
    get_roles(): IRoleDomain[];
    get_permissions(): string[];
    get_confirmation_token(): null;
    get_password_requested_at(): null;
    get_is_super_admin(): boolean;
}

export default UserRepPayload;
