
interface RoleRepPayload
{
    get_name(): string;
    get_slug(): string;
    get_permissions(): string[];
    get_enable(): boolean;
}

export default RoleRepPayload;
