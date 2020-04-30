import IdPayload from "../Defaults/IdPayload";

interface RoleUpdatePayload extends IdPayload
{
    name(): string;
    slug(): string;
    permissions(): any[];
    enable(): boolean;
}

export default RoleUpdatePayload