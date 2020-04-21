import IBaseRepository from "./IBaseRepository";

interface IRoleRepository extends IBaseRepository
{
    exists(ids: string[]): Promise<boolean>;
}

export default IRoleRepository;