import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';

type IRoleTransformer = RoleRepPayload & { id: string };

export default IRoleTransformer;
