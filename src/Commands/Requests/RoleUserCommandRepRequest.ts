import RoleRepPayload from "../../Payloads/Roles/RoleRepPayload";

class RoleCommandRepRequest implements RoleRepPayload
{
    private env: any;

    constructor(env: any)
    {
        this.env = env;
    }

    name(): string
    {
        return this.env.role;
    }

    slug(): string
    {
        return this.env.role.toLowerCase();
    }

    enable(): boolean
    {
        return true;
    }

    permissions(): any[]
    {
        return [];
    }
}

export default RoleCommandRepRequest;