import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import UserService from '../Services/UserService';

class ListUsersUseCase
{
    private user_service = new UserService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.user_service.list(payload);
    }
}

export default ListUsersUseCase;
