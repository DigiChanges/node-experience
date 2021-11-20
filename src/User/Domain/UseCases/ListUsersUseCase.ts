import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import UserService from '../Services/UserService';

class ListUsersUseCase
{
    private userService = new UserService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.userService.list(payload);
    }
}

export default ListUsersUseCase;
