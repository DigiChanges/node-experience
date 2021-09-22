
abstract class DomainRoles
{
    protected static instance: DomainRoles;
    private readonly ALL: string = 'all';
    private permissions: string[];

    abstract readonly NAME: string;

    public get(): string[]
    {
        return this.permissions ?? [];
    }

    public allPermissions()
    {
        this.permissions = [this.ALL];
        return this;
    }

    public exclude(...permissions: string[][])
    {
        const _permissions = permissions.reduce((prev, current) => [...new Set([...prev, ...current])], []);
        this.permissions = this.get().filter(permission => !_permissions.includes(permission));

        return this;
    }

    public extends(...permissions: string[][])
    {
        this.permissions = permissions.reduce((prev, current) => [...new Set([...prev, ...current])], this.get());
        return this;
    }
}

export default DomainRoles;