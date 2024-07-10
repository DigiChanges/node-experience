import SyncDbUseCase from '../../Infrastructure/UseCases/SyncDbUseCase';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';

const synchronize = async() =>
{
    const useCase = DependencyInjector.inject<SyncDbUseCase>('SyncDbUseCase');
    await useCase.handle();
};

void (async() =>
{
    await synchronize();
})();
