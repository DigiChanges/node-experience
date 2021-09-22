import IDomainPermissions from '../InterfaceAdapters/IDomainPermissions';
import IBasicPermissions from '../InterfaceAdapters/IBasicPermissions';

export function domainPermissions<T>()
{
    return <U extends IDomainPermissions<T> & IBasicPermissions>(constructor: U) => constructor;
}