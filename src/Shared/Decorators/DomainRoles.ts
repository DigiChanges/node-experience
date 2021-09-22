import IDomainRoles from '../InterfaceAdapters/IDomainRoles';

export function domainRoles<T>()
{
    return <U extends IDomainRoles<T>>(constructor: U) => constructor;
}