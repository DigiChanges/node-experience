import { DependencyContainer } from 'tsyringe';
import container from '../../DI/container';
import ISeed from './ISeed';

abstract class BaseSeed implements ISeed
{
    container: DependencyContainer;

    constructor()
    {
        this.container = container;
    }

    abstract init(): Promise<void>;
}

export default BaseSeed;
