import IdPayload from "../Defaults/IdPayload";

interface RoleUpdatePayload extends IdPayload
{
    name(): string;
    slug(): string;
    permissions(): [];
    enable(): boolean;
}

export default RoleUpdatePayload