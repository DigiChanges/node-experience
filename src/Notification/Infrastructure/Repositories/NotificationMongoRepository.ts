import { Query, Model } from 'mongoose';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import INotificationRepository from '../../InterfaceAdapters/INotificationRepository';

import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import INotification from '../../InterfaceAdapters/INotificationDocument';
import { connection } from '../../../Shared/Database/MongooseCreateConnection';
import INotificationDomain from '../../InterfaceAdapters/INotificationDomain';
import EmailNotification from '../../Domain/Entities/EmailNotification';
import PushNotification from '../../Domain/Entities/PushNotification';
import NotificationFilter from '../../Presentation/Criterias/NotificationFilter';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';

@injectable()
class NotificationMongoRepository implements INotificationRepository<INotificationDomain>
{
    private readonly repository: Model<INotification>;
    private readonly email_repository: Model<INotification>;
    private readonly push_repository: Model<INotification>;

    constructor()
    {
        this.repository = connection.model<INotification>('Notification');
        this.email_repository = this.repository.discriminators.EmailNotification;
        this.push_repository = this.repository.discriminators.PushNotification;
    }

    async save(notification: INotificationDomain): Promise<INotificationDomain>
    {
        const rep = this.get_repository(notification);
        return await rep.create(notification);
    }

    async get_one(id: string): Promise<INotificationDomain>
    {
        const notification = await this.repository.findOne({ _id: id });

        if (!notification)
        {
            throw new NotFoundException('Notification');
        }

        return notification;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<INotification[], INotification> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(NotificationFilter.KIND))
        {
            const type = filter.get(NotificationFilter.KIND);

            void queryBuilder.where(NotificationFilter.KIND).equals(type);
        }
        if (filter.has(NotificationFilter.NAME))
        {
            const name: string = filter.get(NotificationFilter.NAME);
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(NotificationFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }

    private get_repository(kind: any)
    {
        if (kind instanceof EmailNotification)
        {
            return this.email_repository;
        }
        else if (kind instanceof PushNotification)
        {
            return this.push_repository;
        }
        else
        {
            return this.repository;
        }
    }
}

export default NotificationMongoRepository;
