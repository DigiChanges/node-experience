import { getRequestContext } from '../../Utils/RequestContext';
import { DependencyContainer } from 'tsyringe';
import ISeed from './ISeed';

abstract class BaseSeed implements ISeed
{
    protected container: DependencyContainer | undefined;

    protected constructor()
    {
        this.container = getRequestContext().container;
    }

    abstract init(): Promise<void>;
}

export default BaseSeed;
