import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserService from '../Services/UserService';

class RemoveUserUseCase
{
    private user_service = new UserService();

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.get_id();
        return await this.user_service.remove(id);
    }
}

export default RemoveUserUseCase;
