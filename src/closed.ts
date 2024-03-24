import { createTerminus } from '@godaddy/terminus';

import ICacheDataAccess from './Main/Infrastructure/Repositories/ICacheDataAccess';
import Logger from './Shared/Helpers/Logger';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import { Server } from 'http';
import { IMessageBroker } from './Shared/Infrastructure/IMessageBroker';
import { IEventHandler } from './Notification/Domain/Models/EventHandler';

interface ClosedApplicationParams
{
    server?: Server,
    eventHandler?: IEventHandler
    messageBroker: IMessageBroker
    cache: ICacheDataAccess,
    createConnection: ICreateConnection,
}

const closedApplication = (params: ClosedApplicationParams) =>
{
    function onSignal()
    {
        Logger.info('server is starting cleanup');
        params.cache.close();
        return Promise.all([
            params.createConnection.close(true),
            params.eventHandler.removeListeners(),
            params.messageBroker.disconnect()
        ]);
    }

    function onShutdown()
    {
        Logger.info('cleanup finished, server is shutting down');
        params.cache.close();
        return Promise.all([
            params.createConnection.close(true),
            params.eventHandler.removeListeners(),
            params.messageBroker.disconnect()
        ]);
    }

    if (params.server)
    {
        createTerminus(params.server, {
            timeout: 1000,
            onSignal,
            onShutdown
        });
    }
};

export default closedApplication;
