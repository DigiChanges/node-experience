import IGroupPermission from '../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../Shared/DomainPermissions';
import permissions from '../permissions';

class Permissions
{
    private static domainPermissions = <DomainPermissions[]> [...permissions]

    static groupPermissions(): IGroupPermission[]
    {
        return  this.domainPermissions.reduce((prev, curr) => [...prev, curr.group()], []);
    }

    static permissions(): string[]
    {
        return this.domainPermissions.reduce((prev, curr) => [... new Set([...prev, ...curr.get()])], []);
    }
}

export default Permissions;
