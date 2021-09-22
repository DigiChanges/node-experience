import DomainPermissions from '../DomainPermissions';

interface IDomainPermissions<T>
{
    I: T | DomainPermissions;
}

export default IDomainPermissions;