import UserRepPayload from '../../Domain/Payloads/User/UserRepPayload';

type IUserTransformer = Omit<UserRepPayload, 'roles' | 'emailVerified'> & { id: string };

export default IUserTransformer;
