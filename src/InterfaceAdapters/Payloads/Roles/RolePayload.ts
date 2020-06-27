import Role from "../../../Infrastructure/Entities/Role";

interface RolePayload {
    role(): Role;
}

export default RolePayload