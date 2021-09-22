import DomainRoles from '../DomainRoles';

interface IDomainRoles<T>
{
    I: T | DomainRoles;
}

export default IDomainRoles;