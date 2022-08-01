import { getRequestContext } from '../../Presentation/Shared/RequestContext';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';
import { DependencyContainer } from 'tsyringe';

abstract class BaseSeed implements ISeed
{
    protected container: DependencyContainer;

    constructor()
    {
        this.container = getRequestContext().container;
    }

    abstract init(): Promise<void>;
}

export default BaseSeed;
