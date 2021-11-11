import ContainerFactory from '../../../Shared/Factories/ContainerFactory';
import IBaseRepository from '../../InterfaceAdapters/IBaseRepository';
import IUniqueConfig from '../../InterfaceAdapters/IUniqueConfig';
import UniqueAttributeException from '../Exceptions/UniqueAttributeException';

class UniqueService
{
    static async validate<T = any>(config: IUniqueConfig<T>): Promise<void>
    {
        const { repository, validate, refValue } = config;

        const _repository = ContainerFactory.create<IBaseRepository<any>>(repository);

        const attrs = Object.keys(validate);

        for await (const attr of attrs)
        {
            const exist = await _repository.exist({ [attr]: validate[<keyof T> attr] }, ['_id'], false);

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
}

export default UniqueService;
