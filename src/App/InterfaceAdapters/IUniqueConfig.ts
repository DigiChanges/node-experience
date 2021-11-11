import { REPOSITORIES } from '../../repositories';

interface IUniqueConfig<T = any>
{
    repository: REPOSITORIES;
    attr: (keyof T) | string;
    value: string | number;
    refValue?: string;
}

export default IUniqueConfig;
