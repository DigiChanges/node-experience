import IdPayload from "../Defaults/IdPayload";

interface RoleUpdatePayload extends IdPayload
{
    name(): string;
    slug(): string;
    permissions(): string[];
    enable(): boolean;
}

export default RoleUpdatePayload