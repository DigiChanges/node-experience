import { ICategory } from './ICategory';

export interface ICategoryRepository {
    changeEneable(id: string): ICategory | null
    isEneable(id: string): boolean | null
}
