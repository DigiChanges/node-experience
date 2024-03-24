
export type BasePropertiesTransformer = { id: string, createdAt: number, updatedAt: number };
export type OmitPropertiesTransformer = 'createdAt' | 'updatedAt';

export type BaseTransformer<T> = Partial<Omit<T, OmitPropertiesTransformer>>;
