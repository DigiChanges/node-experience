import { Query, Model, connection } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import INotificationRepository from './INotificationRepository';
import { NotificationMongooseDocument } from '../Schemas/NotificationMongoose';

import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import INotificationDomain from '../../Domain/Entities/INotificationDomain';
import EmailNotification from '../../Domain/Entities/EmailNotification';
import PushNotification from '../../Domain/Entities/PushNotification';
import NotificationFilter from '../../Presentation/Criterias/NotificationFilter';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';

class NotificationMongooseRepository implements INotificationRepository<INotificationDomain>
{
    private readonly repository: Model<NotificationMongooseDocument>;
    private readonly emailRepository: Model<NotificationMongooseDocument>;
    private readonly pushRepository: Model<NotificationMongooseDocument>;

    constructor()
    {
        this.repository = connection.model<NotificationMongooseDocument>('Notification');
        this.emailRepository = this.repository.discriminators.EmailNotification;
        this.pushRepository = this.repository.discriminators.PushNotification;
    }

    async save(notification: INotificationDomain): Promise<INotificationDomain>
    {
        const rep = this.getRepository(notification);
        return await rep.create(notification);
    }

    async getOne(id: string): Promise<INotificationDomain>
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
        const queryBuilder: Query<NotificationMongooseDocument[], NotificationMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(NotificationFilter.KIND))
        {
            const type = filter.get(NotificationFilter.KIND);

            void queryBuilder.where(NotificationFilter.KIND).equals(type);
        }
        if (filter.has(NotificationFilter.NAME))
        {
            const name: string = filter.get(NotificationFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(NotificationFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }

    private getRepository(kind: INotificationDomain)
    {
        if (kind instanceof EmailNotification)
        {
            return this.emailRepository;
        }
        else if (kind instanceof PushNotification)
        {
            return this.pushRepository;
        }
        else
        {
            return this.repository;
        }
    }
}

export default NotificationMongooseRepository;
