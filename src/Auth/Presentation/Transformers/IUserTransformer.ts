import UserRepPayload from '../../Domain/Payloads/User/UserRepPayload';

type IUserTransformer = Omit<UserRepPayload, 'roles'> & { id: string };

export default IUserTransformer;
