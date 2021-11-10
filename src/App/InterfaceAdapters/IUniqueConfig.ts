import { REPOSITORIES } from '../../repositories';

interface IUniqueConfig
{
    repository: REPOSITORIES;
    attr: string;
    value: string | number;
    refValue?: string;
}

export default IUniqueConfig;
