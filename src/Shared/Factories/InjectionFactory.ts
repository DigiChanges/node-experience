import 'reflect-metadata';
const INJECTION = Symbol.for('INJECTION');

class InjectionFactory
{
    static _proxyGetter(proto: any, key: string, resolve: () => any, doCache: boolean)
    {
        function getter()
        {
            if (doCache && !Reflect.hasMetadata(INJECTION, this, key))
            {
                Reflect.defineMetadata(INJECTION, resolve(), this, key);
            }

            if (Reflect.hasMetadata(INJECTION, this, key))
            {
                return Reflect.getMetadata(INJECTION, this, key);
            }

            else
            {
                return resolve();
            }
        }

        function setter(newVal: any)
        {
            Reflect.defineMetadata(INJECTION, newVal, this, key);
        }

        Object.defineProperty(proto, key, {
            configurable: true,
            enumerable: true,
            get: getter,
            set: setter
        });
    }
}

export default InjectionFactory;
