import { REPOSITORIES } from '../../repositories';

interface IUniqueConfig<T = any>
{
    repository: REPOSITORIES;
    validate: { [P in keyof T]?: T[P] }
    refValue?: string;
}

export default IUniqueConfig;
