import ContainerFactory from '../../../Shared/Factories/ContainerFactory';
import IBaseRepository from '../../InterfaceAdapters/IBaseRepository';
import IUniqueConfig from '../../InterfaceAdapters/IUniqueConfig';
import UniqueAttributeException from '../Exceptions/UniqueAttributeException';

class UniqueService
{
    static async validate<T = any>(config: IUniqueConfig<T>): Promise<void>
    {
        const { repository, value, attr, refValue } = config;

        const _repository = ContainerFactory.create<IBaseRepository<any>>(repository);
        const exist = await _repository.exist({ [attr]: value }, ['_id'], false);

        if (refValue && exist && exist._id !== refValue)
        {
            throw new UniqueAttributeException(attr);
        }
        else if (!refValue && exist)
        {
            throw new UniqueAttributeException(attr);
        }

    }
}

export default UniqueService;
