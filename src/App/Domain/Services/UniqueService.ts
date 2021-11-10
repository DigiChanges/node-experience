import ContainerFactory from '../../../Shared/Factories/ContainerFactory';
import IBaseRepository from '../../InterfaceAdapters/IBaseRepository';
import IUniqueConfig from '../../InterfaceAdapters/IUniqueConfig';

class UniqueService
{
    static async handle(config: IUniqueConfig, initThrow = false): Promise<boolean>
    {
        const _repository = ContainerFactory.create<IBaseRepository<any>>(config.repository);
        const exist = await _repository.exist({ [config.attr]: config.value }, ['_id'], initThrow);

        if (exist)
        {
            if (config?.refValue)
            {
                return exist._id === config.refValue;
            }
            else
            {
                return false;
            }
        }

        return true;
    }
}

export default UniqueService;
