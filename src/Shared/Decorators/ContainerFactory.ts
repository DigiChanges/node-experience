import container from '../../inversify.config';
import getDecorators from 'inversify-inject-decorators';

// setup the container...
const { lazyInject: originalLazyInject } = getDecorators(container);

type MyFunction = (...args: any) => any;

// Additional function to make properties decorators compatible with babel and esbuild.
function fixPropertyDecorator<T extends MyFunction>(decorator: T): T
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
