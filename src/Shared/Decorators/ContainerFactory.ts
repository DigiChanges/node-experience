import container from '../../inversify.config';
import getDecorators from 'inversify-inject-decorators';

// setup the container...
const { lazyInject: originalLazyInject } = getDecorators(container);

// Additional function to make properties decorators compatible with babel.
function fixPropertyDecorator<T extends Function>(decorator: T): T
{
    return ((...args: any[]) => (
        target: any,
        propertyName: any,
        ...decoratorArgs: any[]
    ) =>
    {
        decorator(...args)(target, propertyName, ...decoratorArgs);
        return Object.getOwnPropertyDescriptor(target, propertyName);
    }) as any;
}

export const containerFactory = fixPropertyDecorator(originalLazyInject);
