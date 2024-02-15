import NotificationEmailUseCase from '../../Domain/UseCases/NotificationEmailUseCase';
import IJob from '../../../Main/Infrastructure/Jobs/IJob';

class NotificationEmailJob implements IJob<{ email: string }>
{
    name = 'NotificationEmailJob';

    async execute(content: { email: string}): Promise<void>
    {
        await new Promise(resolve => setTimeout(resolve, 10000));

        const useCase = new NotificationEmailUseCase();
        await useCase.handle(content);
    }
}

export default NotificationEmailJob;
