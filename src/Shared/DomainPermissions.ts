import IGroupPermission from './InterfaceAdapters/IGroupPermission';

abstract class DomainPermissions
{
    protected permissions: string[];
    protected static instance: DomainPermissions;

    abstract get(): string[];
    abstract group(): IGroupPermission;

    public include<T>(permissions: (keyof T)[])
    {
        const _permissions = permissions.map(permission => (this as any)[permission]).filter(Boolean);
        this.permissions = this.get().filter((permission: string) => _permissions.includes(permission));

        return this;
    }

    public exclude<T = Permissions>(permissions: (keyof T)[])
    {
        const _permissions = permissions.map(permission => (this as any)[permission]).filter(Boolean);
        this.permissions = this.get().filter(permission => !_permissions.includes(permission));

        return this;
    }

    public extends(...permissions: string[][])
    {
        this.permissions = permissions.reduce((prev, current) => [...new Set([...prev, ...current])], this.get());
        return this;
    }
}

export default DomainPermissions;