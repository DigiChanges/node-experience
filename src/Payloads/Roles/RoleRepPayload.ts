interface RoleRepPayload {
    name(): string;
    slug(): string;
    permissions(): any[];
    enable(): boolean;
}

export default RoleRepPayload