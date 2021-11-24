import INotifierStrategy from './INotifierStrategy';

interface INotificationFactory
{
    create(strategyName: string): INotifierStrategy & any
}

export default INotificationFactory;
