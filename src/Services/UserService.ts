import User from '../Entities/User';
import {inject, injectable} from 'inversify';
import UserRepPayload from "../Payloads/Users/UserRepPayload";
import IdPayload from "../Payloads/Defaults/IdPayload";
import UserUpdatePayload from "../Payloads/Users/UserUpdatePayload";
import {REPOSITORIES} from "../repositories";
import IUserRepository from "../Repositories/Contracts/IUserRepository";
import ICriteria from "../Lib/Contracts/ICriteria";

@injectable()
class UserService {
    private repository: IUserRepository;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository) {
        this.repository = repository;
    }

    public async save (payload: UserRepPayload): Promise<User> {

        const user = new User();
        user.email = payload.email();
        user.password = payload.password();
        user.enable = payload.enable();

        await this.repository.save(User);

        return user;
    }

    public async update (payload: UserUpdatePayload): Promise<User>
    {
        const id = payload.id();
        const user = await this.repository.findOne(id);

        user.email = payload.email();
        user.password = payload.password();
        user.enable = payload.enable();

        await this.repository.save(user);

        return user;
    }

    public async list (criteria: ICriteria)
    {
        return await this.repository.list(criteria);
    }

    public async getOne (payload: IdPayload): Promise<User>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }

    public async remove (payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        const result = await this.repository.delete(id);

        return result;
    }
}

export default UserService;