import ITimestamps from '../../InterfaceAdapters/ITimestamps';

interface IBaseDomain extends ITimestamps
{
    getId(): string;
    setId(id: string): void;
    clone(): void;
}

export default IBaseDomain;
