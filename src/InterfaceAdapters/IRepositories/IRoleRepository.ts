import IBaseRepository from "./IBaseRepository";
import {ObjectID} from "mongodb";

interface IRoleRepository extends IBaseRepository
{
    exists(ids: ObjectID[]): Promise<boolean>;
}

export default IRoleRepository;