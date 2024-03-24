import { ITimestamps } from './ITimestamps';

export interface IBaseDomain extends ITimestamps
{
    getId(): string;
    setId(id: string): void;
}
