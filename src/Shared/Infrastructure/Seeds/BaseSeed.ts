import { DependencyContainer } from 'tsyringe';
import container from '../../../register';
import ISeed from './ISeed';

abstract class BaseSeed implements ISeed
{
    protected container: DependencyContainer;

    protected constructor()
    {
        this.container = container;
    }

    abstract init(): Promise<void>;
}

export default BaseSeed;
