import UserActivePayload from '../../InterfaceAdapters/Payloads/UserActivePayload';
import UserService from '../Services/UserService';

class ActiveUserUseCase
{
    private userService = new UserService();

    async handle(payload: UserActivePayload): Promise<void>
    {
        await this.userService.activeUser(payload);
    }
}

export default ActiveUserUseCase;
