import { faker } from '@faker-js/faker';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';

class ItemSeed extends BaseSeed implements ISeed
{
    public async init()
    {
        const indexes = Array.from({ length: 10 }, (_, i) => i + 1);

        for await (const index of indexes)
        {
            const name = faker.person.firstName();
            const type = index;

            const useCase = DependencyInjector.inject<SaveItemUseCase>('SaveItemUseCase');
            await useCase.handle({ name, type });
        }
    }
}

export default ItemSeed;
