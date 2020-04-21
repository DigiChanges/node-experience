interface RoleRepPayload {
    name(): string;
    slug(): string;
    permissions(): [];
    enable(): boolean;
}

export default RoleRepPayload