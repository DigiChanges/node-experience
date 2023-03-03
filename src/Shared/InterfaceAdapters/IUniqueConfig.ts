import { REPOSITORIES } from '../../Config/Injects';

interface IUniqueConfig<T = any>
{
    repository: REPOSITORIES;
    validate: { [P in keyof T]?: T[P] }
    refValue?: string;
}

export default IUniqueConfig;
