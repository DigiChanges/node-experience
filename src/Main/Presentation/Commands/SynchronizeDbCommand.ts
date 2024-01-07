import SyncDbUseCase from '../../Infrastructure/UseCases/SyncDbUseCase';

const synchronize = async() =>
{
    const useCase = new SyncDbUseCase();
    await useCase.handle();
};

void (async() =>
{
    await synchronize();
})();
